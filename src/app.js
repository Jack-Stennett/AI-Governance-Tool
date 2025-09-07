// v4 — budgets, costs, requirements, complements, contradictions, harsh scoring, tooltips
const CATALOGUE = {
  postures: [
    {id:'laissez', label:'Laissez-faire', base:0.28, desc:'Let models proliferate, no global action.'},
    {id:'clubs', label:'AI clubs / blocs', base:0.40, desc:'Networks among aligned countries.'},
    {id:'ogi', label:'Open Global Investment (OGI)', base:0.43, desc:'Market mechanisms to concentrate investment.'},
    {id:'mad', label:'MAD/MAIM', base:0.38, desc:'Deterrence-based equilibrium.'},
    {id:'moratorium', label:'Global Moratorium', base:0.26, desc:'Halt AGI development.'},
    {id:'cooperate', label:'Cooperative development', base:0.52, desc:'Defensive AI before offensive, by treaty.'},
    {id:'dacc', label:'D/Acc', base:0.46, desc:'Differential acceleration of defensive capability.'},
    {id:'nonprolif', label:'Non-proliferation', base:0.45, desc:'Stop diffusion of dangerous capabilities.'},
    {id:'stratadv', label:'Strategic advantage', base:0.42, desc:'Ensure one actor "wins".'}
  ],
  institutions: [
    {id:'self', label:'Self-governance', desc:'Firms adopt voluntary standards.'},
    {id:'benefits', label:'Benefits & access distribution', desc:'Equitable distribution of TAI benefits.'},
    {id:'corp', label:'Corporate governance bodies', desc:'Board-level AI risk structures.'},
    {id:'iaisa', label:'International AI Safety Agency', desc:'Global regulator enforcing standards.'},
    {id:'ipccai', label:'Scientific consensus (IPCC-for-AI)', desc:'International consensus organisation.'},
    {id:'unfccc', label:'Political forum (UNFCCC-style)', desc:'Ongoing negotiation & review.'},
    {id:'incident', label:'Emergency response hub', desc:'Rapid cross-jurisdiction incident response.'},
    {id:'regulator', label:'Independent national regulator', desc:'Domestic regulator with audit powers.'},
    {id:'coord', label:'Coordination of policy & regulation', desc:'Harmonise evals, red-team, info-sharing.'},
    {id:'domestic', label:'Domestic AI regulators (existing)', desc:'Existing national agencies.'},
    {id:'cern', label:'International Joint Research (CERN for AI)', desc:'Joint, multipolar R&D venture.'},
    {id:'embed', label:'Embedding in existing institutions', desc:'Bolt-on provisions to existing bodies.'}
  ],
  mechanisms: [
    {id:'auditor', label:'Auditor certification regimes', desc:'Train/verify auditing bodies.'},
    {id:'liability', label:'Liability mechanisms', desc:'Civil/criminal responsibility for harms.'},
    {id:'whistle', label:'Whistleblower protections', desc:'Protect insiders at labs or infra orgs.'},
    {id:'market', label:'Market-shaping mechanisms', desc:'Prizes, AMCs to incentivise safety.'},
    {id:'frontier', label:'Frontier Safety Frameworks', desc:'Voluntary pledges by frontier labs.'},
    {id:'predeploy', label:'Pre-deployment evaluation', desc:'Safety tests, evals, red teaming.'},
    {id:'transparency', label:'Mandatory transparency reports', desc:'Regular reporting to a body.'},
    {id:'prohibit', label:'Sector-specific prohibitions', desc:'Limit use in biotech, military, etc.'},
    {id:'incidentreg', label:'Incident reporting registry', desc:'Shared error disclosure portal.'},
    {id:'modelreg', label:'Model registry', desc:'Register models / use-cases.'},
    {id:'standards', label:'Standard setting', desc:'Voluntary norms committees.'},
    {id:'staged', label:'Staged capability thresholds', desc:'Pause/tighten at milestones.'},
    {id:'licensing', label:'Licensing', desc:'Approvals based on compute/capability tests.'}
  ],
  controls: [
    {id:'energy', label:'Energy/Power-use monitoring', desc:'Utility monitoring as proxy for compute.'},
    {id:'killswitch', label:'Kill-switch protocols', desc:'Emergency suspension of training/inference.'},
    {id:'export', label:'Export controls', desc:'Restrict chips, compute, talent transfers.'},
    {id:'hwverify', label:'Hardware-based verification', desc:'On-chip mechanisms to enforce limits.'},
    {id:'cloudenf', label:'Cloud-based enforcement', desc:'Provider-side gates, policy checks, logging.'},
    {id:'computecaps', label:'Technical compute caps', desc:'Architectural limits preventing large models.'},
    {id:'swverify', label:'Software-based verification', desc:'Crypto / proof-of-learning monitors.'}
  ]
};

const SPEC = {
  modes: {
    easy:   { budget_billion:400, pc:40 },
    medium: { budget_billion:240, pc:24 },
    hard:   { budget_billion:160,  pc:16 }
  },
  costs: {
    institutions: {
      self:{usd_billion:0,pc:0}, benefits:{usd_billion:20,pc:4}, corp:{usd_billion:5,pc:1},
      iaisa:{usd_billion:35,pc:6}, ipccai:{usd_billion:15,pc:3}, unfccc:{usd_billion:10,pc:3},
      incident:{usd_billion:10,pc:2}, regulator:{usd_billion:10,pc:2}, coord:{usd_billion:15,pc:3},
      domestic:{usd_billion:0,pc:0}, cern:{usd_billion:40,pc:6}, embed:{usd_billion:5,pc:1}
    },
    mechanisms: {
      auditor:{usd_billion:5,pc:2}, liability:{usd_billion:10,pc:2}, whistle:{usd_billion:2,pc:1},
      market:{usd_billion:15,pc:2}, frontier:{usd_billion:0,pc:1}, predeploy:{usd_billion:10,pc:2},
      transparency:{usd_billion:5,pc:2}, prohibit:{usd_billion:5,pc:3}, incidentreg:{usd_billion:5,pc:2},
      modelreg:{usd_billion:5,pc:2}, standards:{usd_billion:5,pc:1}, staged:{usd_billion:5,pc:3},
      licensing:{usd_billion:15,pc:3}
    },
    controls: {
      energy:{usd_billion:10,pc:1}, killswitch:{usd_billion:2,pc:1}, export:{usd_billion:5,pc:5},
      hwverify:{usd_billion:20,pc:2}, cloudenf:{usd_billion:15,pc:2}, computecaps:{usd_billion:25,pc:3},
      swverify:{usd_billion:10,pc:2}
    }
  },
  requirements: [
    { if_posture:'stratadv', any_of:['export'], penalty:-0.30 },
    { if_posture:'moratorium', all_of:['iaisa'], penalty:-0.25 },
    { if_posture:'moratorium', any_of:['hwverify','cloudenf','swverify'], penalty:-0.25 },
    { if_posture:'nonprolif', any_of:['export','modelreg'], penalty:-0.20 },
    { if_posture:'dacc', any_of:['incident','incidentreg'], penalty:-0.20 },
    { if_posture:'ogi', any_of:['corp','benefits'], penalty:-0.15 }
  ],
  complements: [
    {a:'regulator',b:'licensing',weight:0.12},
    {a:'iaisa',b:'prohibit',weight:0.10},
    {a:'ipccai',b:'transparency',weight:0.08},
    {a:'corp',b:'whistle',weight:0.06},
    {a:'unfccc',b:'standards',weight:0.07},
    {a:'ipccai',b:'predeploy',weight:0.07},
    {a:'transparency',b:'hwverify',weight:0.08},
    {a:'transparency',b:'swverify',weight:0.08},
    {a:'predeploy',b:'swverify',weight:0.05},
    {a:'incidentreg',b:'cloudenf',weight:0.06}
  ],
  contradictions: [
    {a:'self',b:'prohibit',weight:-0.12},
    {a:'self',b:'transparency',weight:-0.08},
    {a:'embed',b:'iaisa',weight:-0.08},
    {a:'cern',b:'export',weight:-0.10},
    {a:'market',b:'licensing',weight:-0.07}
  ]
};

// Difficulty mode and temperature mapping
const DIFFICULTY_MODES = {
  optimist: { temp: 95, label: 'Optimist (95°)' },
  realist: { temp: 70, label: 'Realist (70°)' },
  pessimist: { temp: 35, label: 'Pessimist (35°)' },
  yudkowskyite: { temp: 5, label: 'Yudkowskyite (5°)' }
};

const $ = s => document.querySelector(s);
const tooltip = document.getElementById('tooltip');

function attachTooltip(el, label, desc){
  el.dataset.desc = desc || '';
  el.addEventListener('mouseenter', ()=>{
    const rect = el.getBoundingClientRect();
    tooltip.innerHTML = `<b>${label}</b><br>${desc || ''}`;
    tooltip.style.left = (rect.left + window.scrollX + 8) + 'px';
    tooltip.style.top  = (rect.bottom + window.scrollY + 8) + 'px';
    tooltip.classList.add('show');
  });
  el.addEventListener('mouseleave', ()=> tooltip.classList.remove('show'));
  el.addEventListener('mousemove', (e)=>{
    tooltip.style.left = (e.pageX + 12) + 'px';
    tooltip.style.top  = (e.pageY + 12) + 'px';
  });
}

function renderList(el, items, type){
  if (!el) {
    console.error(`Element not found for type: ${type}`);
    return;
  }
  console.log(`Rendering ${items.length} items for ${type} into element:`, el);
  
  // Clear existing content
  el.innerHTML = '';
  
  items.forEach(x => {
    const wrap = document.createElement('label');
    wrap.className = 'item';
    wrap.dataset.layer = type;
    const input = document.createElement('input');
    input.type = (type==='postures') ? 'radio' : 'checkbox';
    input.name = (type==='postures') ? 'posture' : type;
    input.value = x.id;
    const span = document.createElement('span');
    
    // Add cost information for non-postures
    if (type !== 'postures') {
      const cost = getCost(x.id);
      if (cost) {
        const costText = cost.usd_billion > 0 || cost.pc > 0 
          ? ` ($${cost.usd_billion}B, ${cost.pc}PC)` 
          : ' (Free)';
        span.textContent = x.label + costText;
      } else {
        span.textContent = x.label + ' (Free)';
      }
    } else {
      span.textContent = x.label;
    }
    
    wrap.appendChild(input); wrap.appendChild(span);
    attachTooltip(wrap, x.label, x.desc);
    el.appendChild(wrap);
  });
  
  console.log(`Finished rendering ${type}, element now has ${el.children.length} children`);
}
// Make initializeLists global so HTML can access it
window.initializeLists = function() {
  const posturesEl = document.getElementById('postures');
  const institutionsEl = document.getElementById('institutions');
  const mechanismsEl = document.getElementById('mechanisms');
  const controlsEl = document.getElementById('controls');
  
  console.log('Elements found:', {postures: !!posturesEl, institutions: !!institutionsEl, mechanisms: !!mechanismsEl, controls: !!controlsEl});
  
  if (posturesEl) renderList(posturesEl, CATALOGUE.postures, 'postures');
  if (institutionsEl) renderList(institutionsEl, CATALOGUE.institutions, 'institutions');
  if (mechanismsEl) renderList(mechanismsEl, CATALOGUE.mechanisms, 'mechanisms');
  if (controlsEl) renderList(controlsEl, CATALOGUE.controls, 'controls');
  
  console.log('Lists initialized:', {
    postures: !!posturesEl ? posturesEl.children.length : 0,
    institutions: !!institutionsEl ? institutionsEl.children.length : 0,
    mechanisms: !!mechanismsEl ? mechanismsEl.children.length : 0,
    controls: !!controlsEl ? controlsEl.children.length : 0
  });
};

// Try to initialize immediately and also on DOM ready
window.initializeLists();
document.addEventListener('DOMContentLoaded', window.initializeLists);

let mode = 'medium';
let budget = 0, pc = 0, locked = false;

function updateResourcesUI(){
  $('#moneyLeft').textContent = budget.toString();
  $('#pcLeft').textContent = pc.toString();
}
function setMode(m){
  mode = m;
  const M = SPEC.modes[mode];
  budget = M.budget_billion;
  pc = M.pc;
  document.querySelectorAll('input[type=checkbox], input[name=posture]').forEach(i=> i.checked=false);
  locked = false;
  $('#rollBtn').disabled = true; $('#mcBtn').disabled = true;
  document.querySelectorAll('input').forEach(i=> i.disabled=false);
  syncBuild();
}
document.querySelectorAll('input[name=mode]').forEach(r=> r.addEventListener('change', ()=> setMode(r.value)));
setMode('medium');

function getCost(id){
  for(const cat of ['institutions','mechanisms','controls']){
    if(SPEC.costs[cat][id]) return SPEC.costs[cat][id];
  }
  return null;
}
function currentSelections(){
  const posture = document.querySelector('input[name="posture"]:checked')?.value || null;
  const insts = [...document.querySelectorAll('input[name="institutions"]:checked')].map(i=>i.value);
  const mechs = [...document.querySelectorAll('input[name="mechanisms"]:checked')].map(i=>i.value);
  const ctrls = [...document.querySelectorAll('input[name="controls"]:checked')].map(i=>i.value);
  return {posture, insts, mechs, ctrls};
}
function totals(){
  const {insts, mechs, ctrls} = currentSelections();
  let money=0, pol=0;
  for(const id of [...insts,...mechs,...ctrls]){
    const c = getCost(id); if(!c) continue;
    money += c.usd_billion; pol += c.pc;
  }
  return {money, pol};
}

function updateResourcesUIValues(moneyLeft, pcLeft){
  $('#moneyLeft').textContent = Math.max(0, Math.round(moneyLeft)).toString();
  $('#pcLeft').textContent = Math.max(0, Math.round(pcLeft)).toString();
}
function enforceAffordability(){
  const {money, pol} = totals();
  updateResourcesUIValues(budget - money, pc - pol);
  for(const cat of ['institutions','mechanisms','controls']){
    document.querySelectorAll(`input[name="${cat}"]`).forEach(input=>{
      if(input.checked) { input.parentElement.classList.remove('disabled'); input.disabled=locked; return; }
      const c = getCost(input.value) || {usd_billion:0, pc:0};
      const can = (money + c.usd_billion <= budget) && (pol + c.pc <= pc);
      input.parentElement.classList.toggle('disabled', !can);
      input.disabled = locked ? true : !can;
    });
  }
}

function chip(id, label, layer, desc){
  const span = document.createElement('span');
  span.className = `tag ${layer}`;
  span.textContent = label;
  attachTooltip(span, label, desc || '');
  return span;
}
function syncBuild(){
  const {posture,insts,mechs,ctrls} = currentSelections();
  const find = (arr,id)=>arr.find(x=>x.id===id);

  const pBox = $('#picked-posture'); pBox.innerHTML='';
  if(posture){ const it = CATALOGUE.postures.find(p=>p.id===posture); pBox.appendChild(chip(it.id, it.label, 'posture', it.desc)); }

  const iBox = $('#picked-institutions'); iBox.innerHTML='';
  insts.forEach(id=>{ const it = find(CATALOGUE.institutions,id); iBox.appendChild(chip(id,it.label,'institution',it.desc)); });

  const mBox = $('#picked-mechanisms'); mBox.innerHTML='';
  mechs.forEach(id=>{ const it = find(CATALOGUE.mechanisms,id); mBox.appendChild(chip(id,it.label,'mechanism',it.desc)); });

  const cBox = $('#picked-controls'); cBox.innerHTML='';
  ctrls.forEach(id=>{ const it = find(CATALOGUE.controls,id); cBox.appendChild(chip(id,it.label,'control',it.desc)); });

  enforceAffordability();
  $('#lockBtn').disabled = !posture;
}
document.body.addEventListener('change', syncBuild);

$('#lockBtn').addEventListener('click', ()=>{
  locked = true;
  document.querySelectorAll('input').forEach(i=> i.disabled = true);
  $('#rollBtn').disabled = false;
  const card = $('#resultCard');
  card.classList.remove('muted');
  card.innerHTML = `<h3>Locked</h3><p>Selections frozen. Roll for outcome.</p>`;
});

$('#resetBtn').addEventListener('click', ()=>{
  // Reset all selections
  document.querySelectorAll('input[type=checkbox], input[name=posture]').forEach(i => i.checked = false);
  
  // Unlock everything
  locked = false;
  document.querySelectorAll('input').forEach(i => i.disabled = false);
  
  // Reset buttons
  $('#rollBtn').disabled = true;
  
  // Clear results
  const card = $('#resultCard');
  card.classList.add('muted');
  card.innerHTML = '<h3>Outcome</h3><p>Choose, Lock In, then roll.</p>';
  
  // Clear Monte Carlo results
  const mcCard = $('#mcCard');
  mcCard.classList.add('hidden');
  
  // Sync the build to update display
  syncBuild();
});

function evaluateOnce(rng=Math.random){
  const {posture, insts, mechs, ctrls} = currentSelections();
  if(!posture) return null;
  const T = parseFloat($('#temp').value)/100;
  const base = CATALOGUE.postures.find(p=>p.id===posture).base;

  let score = base;

  for(const pair of SPEC.complements){
    const hasA = insts.includes(pair.a) || mechs.includes(pair.a) || ctrls.includes(pair.a);
    const hasB = insts.includes(pair.b) || mechs.includes(pair.b) || ctrls.includes(pair.b);
    if(hasA && hasB) score += pair.weight;
  }
  for(const pair of SPEC.contradictions){
    const hasA = insts.includes(pair.a) || mechs.includes(pair.a) || ctrls.includes(pair.a);
    const hasB = insts.includes(pair.b) || mechs.includes(pair.b) || ctrls.includes(pair.b);
    if(hasA && hasB) score += pair.weight;
  }
  for(const req of SPEC.requirements){
    if(req.if_posture !== posture) continue;
    let ok = true;
    if(req.all_of){
      ok = req.all_of.every(id => insts.includes(id) || mechs.includes(id) || ctrls.includes(id));
    }
    if(req.any_of){
      ok = ok && req.any_of.some(id => insts.includes(id) || mechs.includes(id) || ctrls.includes(id));
    }
    if(!ok) score += req.penalty;
  }

  if(insts.length>0 && mechs.length>0 && ctrls.length>0) score += 0.04;
  if(insts.length>3) score -= 0.05*(insts.length-3);
  if(mechs.length>5) score -= 0.02*(mechs.length-5);
  if(ctrls.length>5) score -= 0.02*(ctrls.length-5);
  if(insts.includes('self') && mechs.includes('prohibit')) score -= 0.06;

  score = Math.min(1, Math.max(0, score));

  const noise = (rng()-0.5) * 0.30;
  const baseProb = 0.03 + 0.38*score + 0.18*T + noise;
  const headwind = (T < 0.20) ? (0.20 + 2.2*T) : 1.0;
  const prob = Math.min(1, Math.max(0, baseProb * headwind));

  let category, badgeClass;
  if(prob < 0.25){ category = 'Spectacular failure'; badgeClass='fail'; }
  else if(prob < 0.45){ category = 'Mild failure'; badgeClass='mildfail'; }
  else if(prob < 0.70){ category = 'Mild success'; badgeClass='mildsuccess'; }
  else { category = 'Spectacular success'; badgeClass='success'; }

  const narrative = narrate({posture,insts,mechs,ctrls,prob,category,score,T,headwind});
  return {prob, category, badgeClass, narrative};
}

const FAILURE_ENDINGS = [
  '…which culminates in the emergence of a subtly misaligned AI that passes audits but optimises against human intent.',
  '…which accelerates weaponised AI proliferation and destabilises deterrence.',
  '…which produces brittle governance that collapses under stress, leaving safety norms unenforced.',
  '…which normalises covert projects; oversight arrives only after the irreversible step.'
];

function narrate({posture,insts,mechs,ctrls,prob,category,score,T,headwind}){
  const P = (prob*100).toFixed(0);
  const pname = CATALOGUE.postures.find(p=>p.id===posture).label;
  const bits = [];
  bits.push(`You led with <b>${pname}</b>.`);

  const reqs = SPEC.requirements.filter(r=>r.if_posture===posture);
  const reqMsgs = [];
  for(const r of reqs){
    if(r.all_of){
      const ok = r.all_of.every(id => insts.includes(id) || mechs.includes(id) || ctrls.includes(id));
      reqMsgs.push(ok? 'required institutions in place' : 'missing required institution(s)');
    }
    if(r.any_of){
      const ok = r.any_of.some(id => insts.includes(id) || mechs.includes(id) || ctrls.includes(id));
      reqMsgs.push(ok? 'verification coverage present' : 'verification coverage missing');
    }
  }
  if(reqMsgs.length){ bits.push(reqMsgs.join('; ') + '.'); }

  const syn = [];
  for(const pair of SPEC.complements){
    const hasA = insts.includes(pair.a) || mechs.includes(pair.a) || ctrls.includes(pair.a);
    const hasB = insts.includes(pair.b) || mechs.includes(pair.b) || ctrls.includes(pair.b);
    if(hasA && hasB) syn.push(`${pair.a}↔${pair.b}`);
  }
  if(syn.length){ bits.push(`Complements: <i>${syn.slice(0,4).join(', ')}</i>.`); }

  const clashes = [];
  for(const pair of SPEC.contradictions){
    const hasA = insts.includes(pair.a) || mechs.includes(pair.a) || ctrls.includes(pair.a);
    const hasB = insts.includes(pair.b) || mechs.includes(pair.b) || ctrls.includes(pair.b);
    if(hasA && hasB) clashes.push(`${pair.a}×${pair.b}`);
  }
  if(clashes.length){ bits.push(`Tensions: <i>${clashes.slice(0,3).join(', ')}</i>.`); }

  if(T<0.20) bits.push(`Frigid environment: headwind ${(headwind).toFixed(2)}× applied.`);
  else if(T>0.75) bits.push(`Favourable winds nudged borderline calls your way.`);

  bits.push(`<b>${category}</b> — estimated success probability ≈ <b>${P}%</b>.`);

  if(category.includes('failure')){
    const end = FAILURE_ENDINGS[Math.floor(Math.random()*FAILURE_ENDINGS.length)];
    bits.push(`<i>${end}</i>`);
  }

  return bits.join(' ');
}

function drawBars(ctx, counts){
  const labels = ['Spectacular failure','Mild failure','Mild success','Spectacular success'];
  const colours = ['#ff7b76','#ffb37b','#78d39f','#21c17a'];
  const W=ctx.canvas.width, H=ctx.canvas.height, pad=20, bw=(W-2*pad)/labels.length*0.7;
  ctx.clearRect(0,0,W,H);
  const max = Math.max(...counts, 1);
  labels.forEach((lab,i)=>{
    const x = pad + (i+0.15)*(W-2*pad)/labels.length;
    const h = (H-2*pad) * (counts[i]/max);
    const y = H - pad - h;
    ctx.fillStyle = colours[i];
    ctx.fillRect(x, y, bw, h);
    ctx.fillStyle = '#e6e9ef';
    ctx.font = '12px system-ui';
    ctx.fillText(lab, x-10, H-6);
    ctx.fillText(counts[i], x+bw/2-6, y-4);
  });
}

$('#rollBtn').addEventListener('click', ()=>{
  const res = evaluateOnce();
  if(!res) return;
  const card = $('#resultCard');
  card.classList.remove('muted');
  card.innerHTML = `<h3>Outcome <span class="badge ${res.badgeClass}">${res.category}</span></h3>
    <p>${res.narrative}</p>
    <p class="meta">Model: prob = clamp((0.03 + 0.38·score + 0.18·T + noise) × headwind[T<0.2]); noise ±0.15.</p>`;
});

function runMonteCarlo() {
  const N = 1000, counts=[0,0,0,0];
  for(let i=0;i<N;i++){
    const res = evaluateOnce(Math.random);
    if(!res) break;
    const k = {'Spectacular failure':0,'Mild failure':1,'Mild success':2,'Spectacular success':3}[res.category];
    counts[k]++;
  }
  $('#mcCard').classList.remove('hidden');
  const ctx = $('#mcChart').getContext('2d');
  drawBars(ctx, counts);
  $('#mcSummary').textContent = `Over ${N} runs: ${counts[0]} SF, ${counts[1]} MF, ${counts[2]} MS, ${counts[3]} SS.`;
});

function updateTempFromDifficulty(){
  const mode = document.getElementById('difficultyMode').value;
  const tempValue = DIFFICULTY_MODES[mode].temp;
  
  // Create hidden temp input if it doesn't exist
  let tempInput = document.getElementById('temp');
  if (!tempInput) {
    tempInput = document.createElement('input');
    tempInput.id = 'temp';
    tempInput.type = 'hidden';
    tempInput.value = tempValue;
    document.body.appendChild(tempInput);
  } else {
    tempInput.value = tempValue;
  }
  
  document.getElementById('tempVal').textContent = (tempValue/100).toFixed(2);
}

document.getElementById('difficultyMode').addEventListener('change', updateTempFromDifficulty);
updateTempFromDifficulty();
syncBuild();