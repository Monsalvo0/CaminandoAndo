const data = [
  { dia: 1, duracion: "40 minutos", distancia: 3.0, antes: {estres: 7}, despues: {estres: 4} },
  { dia: 2, duracion: "1 hora", distancia: 4.5, antes: {estres: 8}, despues: {estres: 3} },
  { dia: 3, duracion: "50 minutos", distancia: 3.8, antes: {estres: 6}, despues: {estres: 3} },
  { dia: 4, duracion: "1.5 horas", distancia: 6.8, antes: {estres: 9}, despues: {estres: 2} },
  { dia: 5, duracion: "45 minutos", distancia: 3.4, antes: {estres: 7}, despues: {estres: 4} },
  { dia: 6, duracion: "1 hora", distancia: 4.5, antes: {estres: 6}, despues: {estres: 3} },
  { dia: 7, duracion: "1 hora 10 minutos", distancia: 5.3, antes: {estres: 8}, despues: {estres: 3} },
  { dia: 8, duracion: "40 minutos", distancia: 3.0, antes: {estres: 6}, despues: {estres: 3} },
  { dia: 9, duracion: "1 hora", distancia: 4.5, antes: {estres: 7}, despues: {estres: 4} },
  { dia: 10, duracion: "1.5 horas", distancia: 6.8, antes: {estres: 8}, despues: {estres: 2} },
  { dia: 11, duracion: "50 minutos", distancia: 3.8, antes: {estres: 6}, despues: {estres: 3} },
  { dia: 12, duracion: "45 minutos", distancia: 3.4, antes: {estres: 7}, despues: {estres: 4} },
  { dia: 13, duracion: "1 hora", distancia: 4.5, antes: {estres: 8}, despues: {estres: 3} },
  { dia: 14, duracion: "1 hora 15 minutos", distancia: 5.6, antes: {estres: 9}, despues: {estres: 2} },
  { dia: 15, duracion: "40 minutos", distancia: 3.0, antes: {estres: 6}, despues: {estres: 3} },
  { dia: 16, duracion: "1 hora", distancia: 4.5, antes: {estres: 7}, despues: {estres: 4} },
  { dia: 17, duracion: "1.5 horas", distancia: 6.8, antes: {estres: 8}, despues: {estres: 2} },
  { dia: 18, duracion: "50 minutos", distancia: 3.8, antes: {estres: 6}, despues: {estres: 3} },
  { dia: 19, duracion: "45 minutos", distancia: 3.4, antes: {estres: 7}, despues: {estres: 4} },
  { dia: 20, duracion: "1 hora", distancia: 4.5, antes: {estres: 8}, despues: {estres: 3} },
  { dia: 21, duracion: "1 hora 10 minutos", distancia: 5.3, antes: {estres: 9}, despues: {estres: 2} }
];

function duracionAMinutos(str) {
  if (str.includes('hora')) {
    const match = str.match(/(\d+)\s*hora(?:s)?(?:\s*(\d+)\s*minutos?)?/);
    let min = 0;
    if (match) {
      min += parseInt(match[1]) * 60;
      if (match[2]) min += parseInt(match[2]);
    }
    return min;
  } else {
    return parseInt(str);
  }
}

const forest = document.getElementById('forest');
const maxDist = Math.max(...data.map(d => d.distancia));
const maxMin = Math.max(...data.map(d => duracionAMinutos(d.duracion)));
const maxAltura = 80 + (maxDist / maxDist) * 120; 
const svgHeight = maxAltura + 70;
const baseY = svgHeight - 20; 

data.forEach((d, i) => {
  const altura = 80 + (d.distancia / maxDist) * 120; 
  const minutos = duracionAMinutos(d.duracion);
  const follaje = 3 + Math.round((minutos / maxMin) * 7);
  const cambio = Math.abs(d.antes.estres - d.despues.estres); 
  const frutos = cambio; 

  const ancho = 70;
  let troncoPath = `M${ancho/2},${baseY} Q${ancho/2 + cambio*6},${baseY-altura/2} ${ancho/2},${baseY-altura}`;
  let copas = '';
  for (let j = 0; j < follaje; j++) {
    const angle = (Math.PI * 2 / follaje) * j;
    const x = ancho/2 + Math.cos(angle) * 18;
    const y = (baseY-altura) + Math.sin(angle) * 14 - 18;
    copas += `<ellipse cx="${x}" cy="${y}" rx="16" ry="12" fill="#6a994e" opacity="0.85"/>`;
  }
  let frutosSVG = '';
  for (let k = 0; k < frutos; k++) {
    const angle = (Math.PI * 2 / frutos) * k;
    const x = ancho/2 + Math.cos(angle) * 12;
    const y = (baseY-altura) + Math.sin(angle) * 10 - 8;
    frutosSVG += `<circle cx="${x}" cy="${y}" r="4" fill="#f9c74f" stroke="#bc6c25" stroke-width="1"/>`;
  }

  const svg = `
    <svg width="${ancho}" height="${svgHeight}" class="tree-svg" style="overflow:visible;">
      <path d="${troncoPath}" stroke="#386641" stroke-width="8" fill="none" />
      ${copas}
      ${frutosSVG}
    </svg>
    <div class="tree-label">Día ${d.dia}</div>
  `;
  const treeDiv = document.createElement('div');
  treeDiv.innerHTML = svg;
  forest.appendChild(treeDiv);
});