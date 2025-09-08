// AI Governance Strategy Builder - 6-Page Flow with Budget & Evaluation

// Difficulty levels
const DIFFICULTY_LEVELS = {
  optimist: { 
    label: 'Optimist Mode (95°)', 
    temp: 95,
    desc: 'We live in the optimistic world where AI safety is manageable. With proper coordination and reasonable precautions, we can navigate this transition successfully. Multiple approaches can work, and humanity has broad margin for error.' 
  },
  realist: { 
    label: 'Realist Mode (70°)', 
    temp: 70,
    desc: 'We face a challenging but manageable path. AI safety requires serious effort and coordination, but multiple strategies could succeed if executed well. Some mistakes are tolerable, but vigilance is essential.' 
  },
  pessimist: { 
    label: 'Pessimist Mode (35°)', 
    temp: 35,
    desc: 'We live in a precarious world where AI development is fraught with dangers. Only careful, well-executed strategies have a chance of success. Most approaches will fail without exceptional coordination and foresight.' 
  },
  yudkowskyite: { 
    label: 'Yudkowskyite Mode (5°)', 
    temp: 5,
    desc: 'We live in the Yudkowskyian world where AI alignment is extraordinarily difficult. There is only a narrow path that can lead us to existential safety. Most strategies lead to failure, and humanity must thread the needle perfectly.' 
  }
};

// Resource levels
const RESOURCE_LEVELS = {
  high: {
    label: 'High Commitment Scenario',
    budget: 400,
    pc: 40,
    desc: '$400B Budget • 40 Political Capital. Major powers have recognized AI as the defining challenge of our time. Unprecedented international cooperation has emerged, similar to wartime mobilization. Public support is strong across democracies.'
  },
  medium: {
    label: 'Moderate Commitment Scenario', 
    budget: 240,
    pc: 24,
    desc: '$240B Budget • 24 Political Capital. Some countries are taking AI governance seriously, but progress is hampered by competing priorities and disagreements. International cooperation exists but is fragmented and inconsistent.'
  },
  low: {
    label: 'Low Commitment Scenario',
    budget: 160,
    pc: 16, 
    desc: '$160B Budget • 16 Political Capital. Most governments are distracted by short-term crises. AI safety is viewed as a luxury or future problem. You must work within severe constraints and limited international cooperation.'
  }
};

// Costs for all mechanisms
const COSTS = {
  institutions: {
    self: {usd_billion: 0, pc: 0},
    benefits: {usd_billion: 20, pc: 4},
    corp: {usd_billion: 5, pc: 1},
    iaisa: {usd_billion: 35, pc: 6},
    ipccai: {usd_billion: 15, pc: 3},
    unfccc: {usd_billion: 10, pc: 3},
    incident: {usd_billion: 10, pc: 2},
    regulator: {usd_billion: 10, pc: 2},
    coord: {usd_billion: 15, pc: 3},
    domestic: {usd_billion: 0, pc: 0},
    cern: {usd_billion: 40, pc: 6},
    embed: {usd_billion: 5, pc: 1}
  },
  mechanisms: {
    auditor: {usd_billion: 5, pc: 2},
    liability: {usd_billion: 10, pc: 2},
    whistle: {usd_billion: 2, pc: 1},
    market: {usd_billion: 15, pc: 2},
    frontier: {usd_billion: 0, pc: 1},
    predeploy: {usd_billion: 10, pc: 2},
    transparency: {usd_billion: 5, pc: 2},
    prohibit: {usd_billion: 5, pc: 3},
    incidentreg: {usd_billion: 5, pc: 2},
    modelreg: {usd_billion: 5, pc: 2},
    standards: {usd_billion: 5, pc: 1},
    staged: {usd_billion: 5, pc: 3},
    licensing: {usd_billion: 15, pc: 3}
  },
  controls: {
    energy: {usd_billion: 10, pc: 1},
    killswitch: {usd_billion: 2, pc: 1},
    export: {usd_billion: 5, pc: 5},
    hwverify: {usd_billion: 20, pc: 2},
    cloudenf: {usd_billion: 15, pc: 2},
    computecaps: {usd_billion: 25, pc: 3},
    swverify: {usd_billion: 10, pc: 2}
  }
};

// Data from original catalogue with base success rates
const DATA = {
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

// Global state to store selections across pages
const strategy = {
  difficulty: null,
  resources: null,
  posture: null,
  institutions: [],
  mechanisms: [],
  controls: [],
  // Budget tracking
  totalCost: 0,
  totalPoliticalCost: 0,
  availableBudget: 0,
  availablePC: 0
};

// Page management
let currentPage = 1;

function showPage(pageNum) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  document.getElementById(`page${pageNum}`).classList.add('active');
  
  // Update progress bar
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.classList.toggle('active', index + 1 <= pageNum);
    step.classList.toggle('completed', index + 1 < pageNum);
  });
  
  currentPage = pageNum;
  
  // Update budget display if we're past resource selection
  if (pageNum > 2) {
    updateBudgetDisplay();
  }
}

function updateBudgetDisplay() {
  // Calculate total costs
  let totalCost = 0;
  let totalPC = 0;
  
  [...strategy.institutions, ...strategy.mechanisms, ...strategy.controls].forEach(itemId => {
    const cost = getCost(itemId);
    if (cost) {
      totalCost += cost.usd_billion;
      totalPC += cost.pc;
    }
  });
  
  strategy.totalCost = totalCost;
  strategy.totalPoliticalCost = totalPC;
  
  // Update any budget displays on current page
  const budgetDisplays = document.querySelectorAll('.budget-display');
  budgetDisplays.forEach(display => {
    display.innerHTML = `
      <span>Budget: $${totalCost}B / $${strategy.availableBudget}B</span>
      <span>Political Capital: ${totalPC} / ${strategy.availablePC} PC</span>
    `;
  });
}

function getCost(itemId) {
  // Check all cost categories
  for (const category of ['institutions', 'mechanisms', 'controls']) {
    if (COSTS[category][itemId]) {
      return COSTS[category][itemId];
    }
  }
  return null;
}

function showResults() {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('results-page').classList.add('active');
  
  // Populate results
  displayStrategy();
  evaluateStrategy();
}

// Populate difficulty page
function populateDifficultyPage() {
  const grid = document.getElementById('difficulty-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  Object.entries(DIFFICULTY_LEVELS).forEach(([key, difficulty]) => {
    const card = document.createElement('div');
    card.className = `option-card ${strategy.difficulty === key ? 'selected' : ''}`;
    card.setAttribute('data-id', key);
    
    card.innerHTML = `
      <input type="radio" name="difficulty" value="${key}" ${strategy.difficulty === key ? 'checked' : ''} id="difficulty-${key}">
      <label for="difficulty-${key}">
        <h3>${difficulty.label}</h3>
        <p>${difficulty.desc}</p>
      </label>
    `;
    
    const input = card.querySelector('input');
    input.addEventListener('change', () => {
      strategy.difficulty = key;
      // Update all cards
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      // Enable next button
      document.getElementById('next-to-page2').disabled = false;
    });
    
    grid.appendChild(card);
  });
}

// Populate resources page
function populateResourcesPage() {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  Object.entries(RESOURCE_LEVELS).forEach(([key, resource]) => {
    const card = document.createElement('div');
    card.className = `option-card ${strategy.resources === key ? 'selected' : ''}`;
    card.setAttribute('data-id', key);
    
    card.innerHTML = `
      <input type="radio" name="resources" value="${key}" ${strategy.resources === key ? 'checked' : ''} id="resources-${key}">
      <label for="resources-${key}">
        <h3>${resource.label}</h3>
        <p>${resource.desc}</p>
      </label>
    `;
    
    const input = card.querySelector('input');
    input.addEventListener('change', () => {
      strategy.resources = key;
      strategy.availableBudget = resource.budget;
      strategy.availablePC = resource.pc;
      // Update all cards
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      // Enable next button
      document.getElementById('next-to-page3').disabled = false;
    });
    
    grid.appendChild(card);
  });
}

// Create option cards for strategy pages
function createOptionCard(item, type, isSelected = false) {
  const card = document.createElement('div');
  card.className = `option-card ${isSelected ? 'selected' : ''}`;
  card.setAttribute('data-id', item.id);
  
  const isRadio = type === 'postures';
  
  // Get cost information
  let costText = '';
  if (!isRadio) {
    const cost = getCost(item.id);
    if (cost && (cost.usd_billion > 0 || cost.pc > 0)) {
      costText = ` ($${cost.usd_billion}B, ${cost.pc} PC)`;
    } else {
      costText = ' (Free)';
    }
  }
  
  card.innerHTML = `
    <input type="${isRadio ? 'radio' : 'checkbox'}" 
           name="${type}" 
           value="${item.id}" 
           ${isSelected ? 'checked' : ''}
           id="${type}-${item.id}">
    <label for="${type}-${item.id}">
      <h3>${item.label}${costText}</h3>
      <p>${item.desc}</p>
    </label>
  `;
  
  // Handle selection
  const input = card.querySelector('input');
  input.addEventListener('change', () => {
    if (isRadio) {
      // Radio button - update posture
      strategy.posture = item.id;
      // Update all cards in this category
      card.parentElement.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
      // Enable next button
      document.getElementById('next-to-page4').disabled = false;
    } else {
      // Checkbox - update arrays
      const category = strategy[type];
      if (input.checked) {
        if (!category.includes(item.id)) {
          category.push(item.id);
        }
        card.classList.add('selected');
      } else {
        const index = category.indexOf(item.id);
        if (index > -1) {
          category.splice(index, 1);
        }
        card.classList.remove('selected');
      }
      // Update budget display
      updateBudgetDisplay();
    }
  });
  
  return card;
}

// Populate strategy pages
function populatePosturesPage() {
  const grid = document.getElementById('postures-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.postures.forEach(posture => {
    const card = createOptionCard(posture, 'postures', strategy.posture === posture.id);
    grid.appendChild(card);
  });
}

function populateInstitutionsPage() {
  const grid = document.getElementById('institutions-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.institutions.forEach(institution => {
    const card = createOptionCard(institution, 'institutions', strategy.institutions.includes(institution.id));
    grid.appendChild(card);
  });
}

function populateMechanismsPage() {
  const grid = document.getElementById('mechanisms-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.mechanisms.forEach(mechanism => {
    const card = createOptionCard(mechanism, 'mechanisms', strategy.mechanisms.includes(mechanism.id));
    grid.appendChild(card);
  });
}

function populateControlsPage() {
  const grid = document.getElementById('controls-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.controls.forEach(control => {
    const card = createOptionCard(control, 'controls', strategy.controls.includes(control.id));
    grid.appendChild(card);
  });
}

function displayStrategy() {
  const summaryDiv = document.getElementById('strategy-summary');
  
  const postureObj = DATA.postures.find(p => p.id === strategy.posture);
  const institutionObjs = DATA.institutions.filter(i => strategy.institutions.includes(i.id));
  const mechanismObjs = DATA.mechanisms.filter(m => strategy.mechanisms.includes(m.id));
  const controlObjs = DATA.controls.filter(c => strategy.controls.includes(c.id));
  
  summaryDiv.innerHTML = `
    <div class="strategy-section">
      <h3>Strategic Posture</h3>
      <div class="selected-item">${postureObj ? postureObj.label : 'None selected'}</div>
    </div>
    
    <div class="strategy-section">
      <h3>Institutional Architectures (${institutionObjs.length} selected)</h3>
      <div class="selected-items">
        ${institutionObjs.map(i => `<div class="selected-item">${i.label}</div>`).join('')}
      </div>
    </div>
    
    <div class="strategy-section">
      <h3>Regulatory/Legal Mechanisms (${mechanismObjs.length} selected)</h3>
      <div class="selected-items">
        ${mechanismObjs.map(m => `<div class="selected-item">${m.label}</div>`).join('')}
      </div>
    </div>
    
    <div class="strategy-section">
      <h3>Technical Controls (${controlObjs.length} selected)</h3>
      <div class="selected-items">
        ${controlObjs.map(c => `<div class="selected-item">${c.label}</div>`).join('')}
      </div>
    </div>
  `;
}

function evaluateStrategy() {
  const outcomeDiv = document.getElementById('outcome-section');
  
  // Simple evaluation based on number of selections
  const totalSelections = strategy.institutions.length + strategy.mechanisms.length + strategy.controls.length;
  let outcome, description, imageFile;
  
  if (totalSelections >= 8) {
    outcome = 'Comprehensive Strategy';
    description = 'You have built a robust, multi-layered approach to AI governance with strong institutional, regulatory, and technical foundations.';
    imageFile = 'spectacular_success.jpg';
  } else if (totalSelections >= 5) {
    outcome = 'Balanced Strategy';
    description = 'Your approach covers key areas of AI governance with a solid foundation for managing AI risks.';
    imageFile = 'mild_success.jpg';
  } else if (totalSelections >= 2) {
    outcome = 'Minimal Strategy';
    description = 'You have established basic governance mechanisms, but may need additional safeguards for comprehensive AI safety.';
    imageFile = 'mild_failure.jpg';
  } else {
    outcome = 'Insufficient Strategy';
    description = 'Your current approach may not provide adequate protection against AI risks. Consider adding more governance mechanisms.';
    imageFile = 'spectacular_failure.jpg';
  }
  
  outcomeDiv.innerHTML = `
    <div class="outcome-card">
      <img src="${imageFile}" alt="${outcome}" class="outcome-image" onerror="this.style.display='none'">
      <h3>${outcome}</h3>
      <p>${description}</p>
      <div class="outcome-stats">
        <div class="stat">
          <span class="stat-label">Total Mechanisms:</span>
          <span class="stat-value">${totalSelections}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Strategic Approach:</span>
          <span class="stat-value">${DATA.postures.find(p => p.id === strategy.posture)?.label || 'None'}</span>
        </div>
      </div>
    </div>
  `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  
  // Populate all pages
  populateDifficultyPage();
  populateResourcesPage();
  populatePosturesPage();
  populateInstitutionsPage();
  populateMechanismsPage();
  populateControlsPage();
  
  // Navigation event listeners
  document.getElementById('next-to-page2').addEventListener('click', () => showPage(2));
  document.getElementById('back-to-page1').addEventListener('click', () => showPage(1));
  document.getElementById('next-to-page3').addEventListener('click', () => showPage(3));
  document.getElementById('back-to-page2').addEventListener('click', () => showPage(2));
  document.getElementById('next-to-page4').addEventListener('click', () => showPage(4));
  document.getElementById('back-to-page3').addEventListener('click', () => showPage(3));
  document.getElementById('next-to-page5').addEventListener('click', () => showPage(5));
  document.getElementById('back-to-page4').addEventListener('click', () => showPage(4));
  document.getElementById('next-to-page6').addEventListener('click', () => showPage(6));
  document.getElementById('back-to-page5').addEventListener('click', () => showPage(5));
  document.getElementById('complete-strategy').addEventListener('click', () => showResults());
  
  document.getElementById('start-over').addEventListener('click', () => {
    // Reset strategy
    strategy.difficulty = null;
    strategy.resources = null;
    strategy.posture = null;
    strategy.institutions = [];
    strategy.mechanisms = [];
    strategy.controls = [];
    strategy.totalCost = 0;
    strategy.totalPoliticalCost = 0;
    strategy.availableBudget = 0;
    strategy.availablePC = 0;
    
    // Repopulate pages and go to page 1
    populateDifficultyPage();
    populateResourcesPage();
    populatePosturesPage();
    populateInstitutionsPage();
    populateMechanismsPage();
    populateControlsPage();
    showPage(1);
    
    // Disable next buttons
    document.getElementById('next-to-page2').disabled = true;
    document.getElementById('next-to-page3').disabled = true;
    document.getElementById('next-to-page4').disabled = true;
  });
  
});