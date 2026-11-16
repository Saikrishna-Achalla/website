// "My journey" globe: Visakhapatnam -> Francistown -> Gaborone -> Berkeley -> Los Angeles.
// The map libraries load the first time the dialog opens, so the homepage stays light.

(function () {
  const LIBS = [
    'https://cdn.jsdelivr.net/npm/d3-array@3.2.4/dist/d3-array.min.js',
    'https://cdn.jsdelivr.net/npm/d3-geo@3.1.1/dist/d3-geo.min.js',
    'https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js'
  ];
  const WORLD = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

  // [longitude, latitude]; anchor sets which side of the dot the label sits on,
  // and `by` is how I got there from the previous stop
  const STOPS = [
    { name: 'Visakhapatnam', coords: [83.22, 17.69], anchor: 'start' },
    { name: 'Francistown', coords: [27.51, -21.17], anchor: 'start', by: 'plane' },
    { name: 'Gaborone', coords: [25.91, -24.65], anchor: 'end', by: 'car' },
    { name: 'Berkeley', coords: [-122.27, 37.87], anchor: 'end', by: 'plane' },
    { name: 'Los Angeles', coords: [-118.24, 34.05], anchor: 'start', by: 'car' }
  ];

  // Small vehicle icons, drawn pointing up and centred on (0, 0)
  const VEHICLES = {
    // Material Design "flight" icon (Apache 2.0), scaled down
    plane: '<path transform="scale(0.6) translate(-12,-12)" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>',
    // Top-down car: body plus front and rear windows
    car: '<rect x="-3" y="-5" width="6" height="10" rx="1.6"/>' +
         '<rect class="window" x="-2.1" y="-3" width="4.2" height="2" rx="0.5"/>' +
         '<rect class="window" x="-2.1" y="1.8" width="4.2" height="1.4" rx="0.5"/>'
  };
  const LEG_COUNT = STOPS.length - 1;

  const SIZE = 500;
  const RADIUS = 220;
  const SHORT_HOP = 0.2;   // legs shorter than this (radians, ~1300 km) get zoomed in on
  const SHORT_ZOOM = 4.5;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const dialog = document.getElementById('journey');
  const svg = dialog.querySelector('.globe');
  const stopButtons = Array.from(dialog.querySelectorAll('.journey-stops button'));
  const replayButton = dialog.querySelector('.journey-replay');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ready = null;      // promise resolving once libraries + map data have loaded
  let projection, path, land, borders;
  let view = { rotate: [-STOPS[0].coords[0], -STOPS[0].coords[1]], zoom: 1 };
  let legs = new Array(LEG_COUNT).fill(0);   // how much of each leg's arc is drawn, 0..1
  let runId = 0;         // bumping this cancels any running animation

  const layers = {};

  function el(name, attrs, parent) {
    const node = document.createElementNS(SVG_NS, name);
    for (const key in attrs) node.setAttribute(key, attrs[key]);
    (parent || svg).appendChild(node);
    return node;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function load() {
    if (!ready) {
      ready = LIBS.reduce((chain, src) => chain.then(() => loadScript(src)), Promise.resolve())
        .then(() => fetch(WORLD))
        .then((response) => response.json())
        .then((world) => {
          land = topojson.feature(world, world.objects.countries);
          borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
          setup();
        });
    }
    return ready;
  }

  function setup() {
    projection = d3.geoOrthographic().translate([SIZE / 2, SIZE / 2]).clipAngle(90).precision(0.5);
    path = d3.geoPath(projection);

    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
    const clip = el('clipPath', { id: 'globe-clip' });
    layers.clipCircle = el('circle', { cx: SIZE / 2, cy: SIZE / 2 }, clip);

    layers.ocean = el('circle', { class: 'globe-ocean', cx: SIZE / 2, cy: SIZE / 2 });
    const clipped = el('g', { 'clip-path': 'url(#globe-clip)' });
    layers.graticule = el('path', { class: 'globe-graticule' }, clipped);
    layers.land = el('path', { class: 'globe-land' }, clipped);
    layers.borders = el('path', { class: 'globe-borders' }, clipped);
    layers.arcs = legs.map((_, i) =>
      el('path', { class: STOPS[i + 1].by === 'car' ? 'globe-arc road' : 'globe-arc' }, clipped));
    layers.rim = el('circle', { class: 'globe-rim', cx: SIZE / 2, cy: SIZE / 2 });
    layers.stops = STOPS.map((stop) => {
      const group = el('g', { class: 'globe-stop' });
      el('circle', { r: 9, class: 'globe-pulse' }, group);
      el('circle', { r: 4.5, class: 'globe-dot' }, group);
      const label = el('text', { dy: '0.35em' }, group);
      label.textContent = stop.name;
      group.label = label;
      return group;
    });
    layers.vehicles = {};
    for (const kind in VEHICLES) {
      const vehicle = el('g', { class: `globe-vehicle ${kind}` });
      vehicle.innerHTML = VEHICLES[kind];
      vehicle.style.display = 'none';
      layers.vehicles[kind] = vehicle;
    }

    layers.graticuleData = d3.geoGraticule10();
    draw();
  }

  // A great-circle line from a to b, cut off at fraction t
  function partialArc(a, b, t) {
    if (t <= 0) return null;
    const interpolate = d3.geoInterpolate(a, b);
    const steps = Math.max(2, Math.ceil(64 * t));
    const coordinates = [];
    for (let i = 0; i <= steps; i++) coordinates.push(interpolate((i / steps) * t));
    return { type: 'LineString', coordinates };
  }

  function draw() {
    const radius = RADIUS * view.zoom;
    projection.rotate(view.rotate).scale(radius);
    layers.clipCircle.setAttribute('r', radius);
    layers.ocean.setAttribute('r', radius);
    layers.rim.setAttribute('r', radius);

    layers.graticule.setAttribute('d', path(layers.graticuleData) || '');
    layers.land.setAttribute('d', path(land) || '');
    layers.borders.setAttribute('d', path(borders) || '');

    for (let i = 0; i < LEG_COUNT; i++) {
      const arc = partialArc(STOPS[i].coords, STOPS[i + 1].coords, legs[i]);
      layers.arcs[i].setAttribute('d', arc ? path(arc) || '' : '');
    }

    const center = [-view.rotate[0], -view.rotate[1]];
    STOPS.forEach((stop, i) => {
      const visible = d3.geoDistance(stop.coords, center) < Math.PI / 2 - 0.05;
      const reached = i === 0 || legs[i - 1] >= 1;
      const [x, y] = projection(stop.coords);
      const group = layers.stops[i];
      group.setAttribute('transform', `translate(${x},${y})`);
      group.style.display = visible && reached ? '' : 'none';

      // Flip the label to the other side of the dot near the edges so it never gets cut off
      let anchor = stop.anchor;
      if (x > SIZE * 0.7) anchor = 'end';
      else if (x < SIZE * 0.3) anchor = 'start';
      group.label.setAttribute('text-anchor', anchor);
      group.label.setAttribute('x', anchor === 'end' ? -12 : 12);
    });

    drawVehicle(center);
  }

  // Put the plane or car at the tip of whichever leg is being drawn, facing along it
  function drawVehicle(center) {
    for (const kind in layers.vehicles) layers.vehicles[kind].style.display = 'none';

    const i = legs.findIndex((t) => t > 0 && t < 1);
    if (i < 0) return;
    const along = d3.geoInterpolate(STOPS[i].coords, STOPS[i + 1].coords);
    const t = legs[i];
    const head = along(t);
    if (d3.geoDistance(head, center) > Math.PI / 2 - 0.05) return;

    const [x, y] = projection(head);
    const [bx, by] = projection(along(Math.max(0, t - 0.01)));
    const angle = Math.atan2(y - by, x - bx) * 180 / Math.PI + 90;

    const vehicle = layers.vehicles[STOPS[i + 1].by];
    vehicle.setAttribute('transform', `translate(${x},${y}) rotate(${angle})`);
    vehicle.style.display = '';
  }

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Shortest way round for longitude rotation
  function wrapTo(from, to) {
    let delta = ((to - from + 540) % 360) - 180;
    return from + delta;
  }

  // Animate over `duration` ms; step(t) receives eased progress and returns the view to draw
  function animate(duration, step, id) {
    return new Promise((resolve) => {
      if (reduceMotion) duration = 0;
      const start = performance.now();
      function frame(now) {
        if (id !== runId) return resolve(false);
        const t = duration ? Math.min(1, (now - start) / duration) : 1;
        step(ease(t));
        draw();
        if (t < 1) requestAnimationFrame(frame);
        else resolve(true);
      }
      requestAnimationFrame(frame);
    });
  }

  function wait(ms, id) {
    return new Promise((resolve) => setTimeout(() => resolve(id === runId), reduceMotion ? 0 : ms));
  }

  function flyTo(coords, zoom, duration, id) {
    const from = { rotate: view.rotate.slice(), zoom: view.zoom };
    const toLon = wrapTo(from.rotate[0], -coords[0]);
    const toLat = -coords[1];
    return animate(duration, (t) => {
      view.rotate = [lerp(from.rotate[0], toLon, t), lerp(from.rotate[1], toLat, t)];
      view.zoom = lerp(from.zoom, zoom, t);
    }, id);
  }

  function highlight(index) {
    stopButtons.forEach((button, i) => button.classList.toggle('active', i === index));
  }

  function legLength(i) {
    return d3.geoDistance(STOPS[i].coords, STOPS[i + 1].coords);
  }

  function isShort(i) {
    return i >= 0 && i < LEG_COUNT && legLength(i) < SHORT_HOP;
  }

  function midpoint(i) {
    return d3.geoInterpolate(STOPS[i].coords, STOPS[i + 1].coords)(0.5);
  }

  // Where to look when showing a stop: zoomed in on its short hop if it has one
  function focusFor(index) {
    if (isShort(index - 1)) return { coords: midpoint(index - 1), zoom: SHORT_ZOOM };
    if (isShort(index)) return { coords: midpoint(index), zoom: SHORT_ZOOM };
    return { coords: STOPS[index].coords, zoom: 1 };
  }

  async function play() {
    const id = ++runId;
    legs.fill(0);
    view = { rotate: [-STOPS[0].coords[0], -STOPS[0].coords[1]], zoom: 1 };
    highlight(0);
    draw();

    if (!(await wait(700, id))) return;

    for (let i = 0; i < LEG_COUNT; i++) {
      if (isShort(i)) {
        // Zoom in on the hop, then draw it
        if (!(await flyTo(midpoint(i), SHORT_ZOOM, 1100, id))) return;
        if (!(await wait(200, id))) return;
        if (!(await animate(900, (t) => { legs[i] = t; }, id))) return;
      } else {
        // Long leg: zoom back out while the globe turns with the head of the arc
        const along = d3.geoInterpolate(STOPS[i].coords, STOPS[i + 1].coords);
        const startZoom = view.zoom;
        const ok = await animate(900 + legLength(i) * 800, (t) => {
          legs[i] = t;
          const head = along(t);
          view.rotate = [wrapTo(view.rotate[0], -head[0]), -head[1]];
          view.zoom = lerp(startZoom, 1, Math.min(1, t * 3));
        }, id);
        if (!ok) return;
      }
      highlight(i + 1);
      if (!(await wait(300, id))) return;
    }
  }

  function jumpTo(index) {
    const id = ++runId;
    legs.fill(1);
    highlight(index);
    const focus = focusFor(index);
    flyTo(focus.coords, focus.zoom, 1400, id);
  }

  window.openJourney = function () {
    dialog.showModal();
    dialog.classList.add('loading');
    load()
      .then(() => {
        dialog.classList.remove('loading');
        play();
      })
      .catch(() => {
        dialog.classList.remove('loading');
        dialog.classList.add('failed');
      });
  };

  stopButtons.forEach((button, i) => button.addEventListener('click', () => ready && ready.then(() => jumpTo(i))));
  replayButton.addEventListener('click', () => ready && ready.then(play));
  dialog.querySelector('.journey-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => { runId++; });
})();
