// AI Governance Strategy Builder - Clean 4-Page Flow

// Data from original catalogue
const DATA = {
  postures: [
    {id:'laissez', label:'Laissez-faire', desc:'Let models proliferate, no global action.'},
    {id:'clubs', label:'AI clubs / blocs', desc:'Networks among aligned countries.'},
    {id:'ogi', label:'Open Global Investment (OGI)', desc:'Market mechanisms to concentrate investment.'},
    {id:'mad', label:'MAD/MAIM', desc:'Deterrence-based equilibrium.'},
    {id:'moratorium', label:'Global Moratorium', desc:'Halt AGI development.'},
    {id:'cooperate', label:'Cooperative development', desc:'Defensive AI before offensive, by treaty.'},
    {id:'dacc', label:'D/Acc', desc:'Differential acceleration of defensive capability.'},
    {id:'nonprolif', label:'Non-proliferation', desc:'Stop diffusion of dangerous capabilities.'},
    {id:'stratadv', label:'Strategic advantage', desc:'Ensure one actor "wins".'}
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
  difficulty: 'realist', // Default from earlier phases
  resources: 'medium',   // Default from earlier phases
  posture: null,
  institutions: [],
  mechanisms: [],
  controls: []
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

// Create option cards
function createOptionCard(item, type, isSelected = false) {
  const card = document.createElement('div');
  card.className = `option-card ${isSelected ? 'selected' : ''}`;
  card.setAttribute('data-id', item.id);
  
  const isRadio = type === 'postures';
  
  card.innerHTML = `
    <input type="${isRadio ? 'radio' : 'checkbox'}" 
           name="${type}" 
           value="${item.id}" 
           ${isSelected ? 'checked' : ''}
           id="${type}-${item.id}">
    <label for="${type}-${item.id}">
      <h3>${item.label}</h3>
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
      document.getElementById('next-to-page2').disabled = false;
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
    }
  });
  
  return card;
}

// Populate page options
function populatePage1() {
  const grid = document.getElementById('postures-grid');
  grid.innerHTML = '';
  
  DATA.postures.forEach(posture => {
    const card = createOptionCard(posture, 'postures', strategy.posture === posture.id);
    grid.appendChild(card);
  });
}

function populatePage2() {
  const grid = document.getElementById('institutions-grid');
  grid.innerHTML = '';
  
  DATA.institutions.forEach(institution => {
    const card = createOptionCard(institution, 'institutions', strategy.institutions.includes(institution.id));
    grid.appendChild(card);
  });
}

function populatePage3() {
  const grid = document.getElementById('mechanisms-grid');
  grid.innerHTML = '';
  
  DATA.mechanisms.forEach(mechanism => {
    const card = createOptionCard(mechanism, 'mechanisms', strategy.mechanisms.includes(mechanism.id));
    grid.appendChild(card);
  });
}

function populatePage4() {
  const grid = document.getElementById('controls-grid');
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
  populatePage1();
  populatePage2();
  populatePage3();
  populatePage4();
  
  // Navigation event listeners
  document.getElementById('next-to-page2').addEventListener('click', () => showPage(2));
  document.getElementById('back-to-page1').addEventListener('click', () => showPage(1));
  document.getElementById('next-to-page3').addEventListener('click', () => showPage(3));
  document.getElementById('back-to-page2').addEventListener('click', () => showPage(2));
  document.getElementById('next-to-page4').addEventListener('click', () => showPage(4));
  document.getElementById('back-to-page3').addEventListener('click', () => showPage(3));
  document.getElementById('complete-strategy').addEventListener('click', () => showResults());
  document.getElementById('start-over').addEventListener('click', () => {
    // Reset strategy
    strategy.posture = null;
    strategy.institutions = [];
    strategy.mechanisms = [];
    strategy.controls = [];
    
    // Repopulate pages and go to page 1
    populatePage1();
    populatePage2();
    populatePage3();
    populatePage4();
    showPage(1);
    
    // Disable next button on page 1
    document.getElementById('next-to-page2').disabled = true;
  });
  
});