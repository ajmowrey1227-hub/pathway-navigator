(function () {
  'use strict';

  const STAR_COUNT = 80;
  const SPARKLE_COUNT = 25;

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => el.querySelectorAll(sel);

  const screens = {
    start: $('#start'),
    quiz: $('#quiz'),
    results: $('#results'),
    resources: $('#resources'),
  };

  const progressWrap = $('#progress-wrap');
  const progressFill = $('#progress-fill');
  const progressText = $('#progress-text');
  const stepContainer = $('#step-container');
  const resultCards = $('#result-cards');
  const resourcesList = $('#resources-list');
  const roleStrip = $('#role-strip');
  const liveRegion = $('#live-region');
  const skipLink = $('#skip-link');

  let currentStep = 0;
  let answers = [];
  let scores = {};
  let lang = 'en';
  let region = 'chicago';
  let topCareerIds = [];
  let internName = '';
  let coachMode = false;

  const ROLE_CERT_RECS = {
    developer: ['freeCodeCamp', 'Codecademy'],
    webdev: ['freeCodeCamp', 'Codecademy'],
    data: ['Google Data Analytics Certificate', 'CompTIA Data+', 'Microsoft Power BI Data Analyst (PL-300)'],
    dba: ['CompTIA Data+', 'Google Data Analytics Certificate'],
    security: ['CompTIA Security+', 'CompTIA Network+'],
    cloud: ['AWS Certified Cloud Practitioner', 'Microsoft Azure Fundamentals (AZ-900)', 'CompTIA Cloud+', 'AWS Certified Solutions Architect – Associate'],
    support: ['CompTIA A+', 'Google IT Support Professional Certificate'],
    techsupport: ['CompTIA A+', 'Google IT Support Professional Certificate'],
    pm: ['Certified ScrumMaster (CSM)', 'CAPM (Project Management)', 'PMI-ACP (Agile Certified Practitioner)'],
    qa: ['ISTQB Foundation (QA)'],
    ux: ['Google UX Design Certificate'],
    digital: ['Google Career Certificates'],
    analyst: ['Google Data Analytics Certificate', 'ECBA (Business Analysis)'],
    impl: ['Certified ScrumMaster (CSM)'],
  };

  const CAREER_BADGES = {
    developer: ['beginner', 'project', 'remote'],
    webdev: ['beginner', 'project', 'remote'],
    support: ['beginner', 'people'],
    techsupport: ['beginner', 'people'],
    analyst: ['people'],
    pm: ['people', 'remote'],
    digital: ['people', 'remote'],
    qa: ['beginner', 'project'],
    data: ['cert'],
    dba: ['cert'],
    security: ['cert'],
    cloud: ['cert', 'remote'],
    ux: ['project', 'people'],
    impl: ['people'],
  };

  const BADGE_LABELS = {
    beginner: 'Great for beginners',
    cert: 'Certification heavy',
    people: 'People-focused',
    remote: 'Remote-friendly',
    project: 'Project-based',
  };

  const RESOURCE_ICONS = {
    'LinkedIn Learning': 'in',
    LinkedIn: 'in',
    freeCodeCamp: '</>',
    Codecademy: '</>',
    'Microsoft Learn': 'MS',
    'Google Career Certificates': 'G',
    'CompTIA A+': 'A+',
    'CompTIA Network+': 'N+',
    'CompTIA Security+': 'S+',
    'CompTIA Data+': 'D+',
    'CompTIA Cloud+': 'C+',
    'AWS Certified Cloud Practitioner': 'AWS',
    'Microsoft Azure Fundamentals (AZ-900)': 'AZ',
    'Google Data Analytics Certificate': 'G',
    'Google UX Design Certificate': 'G',
    'Certified ScrumMaster (CSM)': 'SM',
    'ISTQB Foundation (QA)': 'QA',
    'CAPM (Project Management)': 'PM',
    'PMI-ACP (Agile Certified Practitioner)': 'AP',
    'ECBA (Business Analysis)': 'BA',
    'Google IT Support Professional Certificate': 'IT',
    'AWS Certified Solutions Architect – Associate': 'SA',
    'Microsoft Power BI Data Analyst (PL-300)': 'BI',
    GitHub: '{ }',
    TryHackMe: 'TH',
    'Hack The Box': 'HTB',
    Figma: 'F',
    Indeed: 'ID',
    Glassdoor: 'GD',
    'i.c.stars': '*',
  };

  function t(key, params = {}) {
    const keys = key.split('.');
    let val = TRANSLATIONS[lang];
    for (const k of keys) {
      val = val?.[k];
    }
    if (typeof val !== 'string') return key;
    return Object.entries(params).reduce((s, [k, v]) => s.replace(`{${k}}`, v), val);
  }

  function announce(message) {
    if (liveRegion) {
      liveRegion.textContent = '';
      liveRegion.textContent = message;
    }
  }

  function setDocumentLang(l) {
    document.documentElement.lang = l;
  }

  function showScreen(id) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    const screen = screens[id];
    if (screen) screen.classList.add('active');

    document.body.classList.toggle('has-progress', id === 'quiz');
    if (progressWrap) progressWrap.classList.toggle('hidden', id !== 'quiz');

    const focusTarget = screen?.querySelector('h1, h2, [tabindex="-1"]') || screen;
    if (focusTarget) {
      requestAnimationFrame(() => focusTarget.focus?.({ preventScroll: true }));
    }

    if (id === 'results') announce(t('results.title'));
    if (id === 'resources') {
      announce(t('resources.title'));
      requestAnimationFrame(() => {
        screens.resources?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function createStarfield() {
    const field = $('#starfield');
    if (!field) return;

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      if (i % 4 === 0) star.classList.add('small');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      star.style.animationDuration = 1.5 + Math.random() * 1.5 + 's';
      field.appendChild(star);
    }
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star sparkle';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 1.5 + 's';
      star.style.animationDuration = 1.2 + Math.random() * 0.8 + 's';
      field.appendChild(star);
    }

    startShootingStars(field);
  }

  function getRegionName() {
    const r = PATHWAY_DATA.regions?.[region];
    return lang === 'es' && r?.nameEs ? r.nameEs : (r?.name || region);
  }

  function spawnShootingStar(field) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    const startX = Math.random() * 100;
    const startY = 5 + Math.random() * 40;
    star.style.left = startX + '%';
    star.style.top = startY + '%';
    field.appendChild(star);
    star.addEventListener('animationend', () => {
      star.remove();
    });
  }

  function startShootingStars(field) {
    setInterval(() => {
      spawnShootingStar(field);
    }, 7000 + Math.random() * 5000);
  }

  function triggerAnswerBurst(targetEl) {
    const rect = targetEl.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'answer-burst';
    burst.style.left = rect.left + rect.width / 2 + 'px';
    burst.style.top = rect.top + rect.height / 2 + 'px';
    document.body.appendChild(burst);
    burst.addEventListener('animationend', () => burst.remove());
  }

  function findResourcesByNames(names) {
    const all = [];
    const nameSet = new Set(names);
    PATHWAY_DATA.resources.forEach((cat) => {
      cat.items.forEach((item) => {
        if (nameSet.has(item.name)) all.push(item);
      });
    });
    return all;
  }

  function buildUserSummary() {
    const importantSteps = ['work-style', 'skills', 'impact'];
    const parts = [];

    importantSteps.forEach((stepId) => {
      const idx = PATHWAY_DATA.steps.findIndex((s) => s.id === stepId);
      if (idx === -1) return;
      const choiceId = answers[idx];
      if (!choiceId) return;
      const step = PATHWAY_DATA.steps[idx];
      const option = step.options.find((o) => o.id === choiceId);
      if (!option) return;
      const stepT = TRANSLATIONS[lang]?.steps?.[stepId];
      const label = stepT?.options?.[choiceId] || option.label;
      parts.push(label);
    });

    return parts.join(' • ');
  }

  function buildConfidenceNudge() {
    const entryIdx = PATHWAY_DATA.steps.findIndex((s) => s.id === 'entry');
    if (entryIdx === -1) return '';
    const choiceId = answers[entryIdx];
    if (!choiceId) return '';

    switch (choiceId) {
      case 'code-first':
        return "You don't need to know everything to start – getting solid with one language and a few small projects is enough for a first role.";
      case 'analysis-first':
        return 'Your interest in understanding people and business needs is a big strength – a lot of tech teams struggle to find good communicators.';
      case 'support-first':
        return 'Starting in support is a powerful entry point – many security, cloud, and engineering careers begin with helping users every day.';
      case 'cert-first':
        return 'Focusing on certifications is a smart move – consistent study over a few months can open real doors, even with little prior experience.';
      default:
        return '';
    }
  }

  function renderPathwayMap(topIds = []) {
    // removed pathway map rendering per latest request
  }

  function renderStartScreen() {
    const titleEl = $('.title', screens.start);
    const taglineEl = $('.tagline', screens.start);
    const introEl = $('.intro', screens.start);
    const regionLabel = $('#region-label-text');
    const langLabel = $('#lang-label-text');
    const regionSelect = $('#region-select');
    const langSelect = $('#lang-select');
    const nameLabel = $('#name-label-text');
    const nameInput = $('#intern-name');
    const startBtn = $('#btn-start');
    const skipEl = $('#skip-link');

    if (titleEl) titleEl.textContent = t('start.title');
    if (taglineEl) taglineEl.textContent = t('start.tagline');
    if (introEl) introEl.textContent = t('start.intro');
    if (regionLabel) regionLabel.textContent = t('start.regionLabel');
    if (langLabel) langLabel.textContent = t('start.languageLabel');
    if (nameLabel) nameLabel.textContent = t('start.nameLabel');
    if (startBtn) startBtn.textContent = t('start.startBtn');
    if (skipEl) skipEl.textContent = t('skipLink');

    if (regionSelect) regionSelect.value = region;
    if (langSelect) langSelect.value = lang;
    if (nameInput) nameInput.value = internName;
  }

  function renderStep() {
    const steps = PATHWAY_DATA.steps;
    if (currentStep >= steps.length) {
      computeScores();
      runResultsTransition();
      return;
    }

    const step = steps[currentStep];
    const selectedId = answers[currentStep];
    const stepT = TRANSLATIONS[lang]?.steps?.[step.id];
    const title = stepT?.title || step.title;
    const optionLabel = (opt) => stepT?.options?.[opt.id] || opt.label;

    stepContainer.innerHTML = `
      <h2 id="step-title" class="step-title">${escapeHtml(title)}</h2>
      <p id="step-error" class="step-error" hidden>${
        lang === 'es' ? 'Respuesta requerida.' : 'Answer required.'
      }</p>
      <div class="options" role="radiogroup" aria-labelledby="step-title">
        ${step.options
          .map(
            (opt, idx) => `
          <label class="option ${selectedId === opt.id ? 'selected' : ''}" data-index="${idx}">
            <input type="radio" name="step-${step.id}" value="${escapeHtml(opt.id)}" ${selectedId === opt.id ? 'checked' : ''} aria-describedby="opt-desc-${step.id}-${opt.id}" />
            <span id="opt-desc-${step.id}-${opt.id}">${escapeHtml(optionLabel(opt))}</span>
          </label>
        `
          )
          .join('')}
      </div>
    `;

    const optionsEl = stepContainer.querySelector('.options');
    const options = stepContainer.querySelectorAll('.option');
    options.forEach((label) => {
      label.addEventListener('click', () => selectOption(step, label));
    });
    if (optionsEl) {
      optionsEl.addEventListener('keydown', (e) => handleOptionKeydown(e, step, options));
    }

    const total = steps.length;
    updateProgress(currentStep + 1, total);
    renderNavButtons();
    if (options.length) options[0].querySelector('input')?.focus();
  }

  function selectOption(step, label) {
    const radio = label.querySelector('input[type="radio"]');
    if (!radio) return;
    radio.checked = true;
    answers[currentStep] = radio.value;
    stepContainer.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
    label.classList.add('selected');
    announce(`${t('progress.step', { current: currentStep + 1, total: PATHWAY_DATA.steps.length })}. ${label.textContent?.trim() || ''}`);
    triggerAnswerBurst(label);
  }

  function handleOptionKeydown(e, step, options) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== ' ') return;
    const label = e.target.closest('.option');
    if (e.key === ' ') {
      e.preventDefault();
      if (label) selectOption(step, label);
      return;
    }
    e.preventDefault();
    const current = Array.from(options).findIndex((o) => o.querySelector('input')?.checked);
    let next = current < 0 ? 0 : current;
    if (e.key === 'ArrowDown') next = Math.min(next + 1, options.length - 1);
    if (e.key === 'ArrowUp') next = Math.max(next - 1, 0);
    const nextLabel = options[next];
    if (nextLabel) {
      const radio = nextLabel.querySelector('input');
      if (radio) {
        radio.checked = true;
        answers[currentStep] = radio.value;
        options.forEach((o) => o.classList.remove('selected'));
        nextLabel.classList.add('selected');
        radio.focus();
      }
    }
  }

  function renderNavButtons() {
    const btnBack = $('#btn-back');
    const btnNext = $('#btn-next');
    if (btnBack) {
      btnBack.textContent = t('nav.back');
      btnBack.classList.toggle('visible', currentStep > 0);
    }
    if (btnNext) btnNext.textContent = t('nav.next');
  }

  function updateProgress(step, total) {
    if (!progressFill || !progressText) return;
    const pct = total ? (step / total) * 100 : 0;
    progressFill.style.width = pct + '%';
    progressText.textContent = total ? t('progress.step', { current: step, total }) : '';
  }

  function computeScores() {
    const careers = PATHWAY_DATA.careers;
    const careerIds = Object.keys(careers);

    careerIds.forEach((id) => {
      scores[id] = 0;
    });

    PATHWAY_DATA.steps.forEach((step, i) => {
      const chosenId = answers[i];
      if (!chosenId) return;
      const option = step.options.find((o) => o.id === chosenId);
      if (!option || !option.scores) return;
      careerIds.forEach((id) => {
        scores[id] = (scores[id] || 0) + (option.scores[id] || 0);
      });
    });

    return scores;
  }

  function getTopCareers(limit = 5) {
    return Object.entries(scores)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id);
  }

  function getSalaryForCareer(careerId) {
    const deep = PATHWAY_DATA.deepDives?.[careerId];
    if (!deep) return '';
    const regional = deep.salaryByRegion?.[region];
    return regional || deep.salaryRange || '';
  }

  function renderResultCards() {
    let topIds = getTopCareers(5);
    if (!topIds || !topIds.length) {
      topIds = Object.keys(PATHWAY_DATA.careers || {}).slice(0, 5);
    }
    topCareerIds = topIds;
    const careers = PATHWAY_DATA.careers;
    const deepDives = PATHWAY_DATA.deepDives;
    const regionName = getRegionName();
    const userSummary = buildUserSummary();
    const resultsNameEl = $('#results-name');
    const coachSummaryEl = $('#coach-summary');
    const resultsNudgeEl = $('#results-nudge');

    if (resultsNameEl) {
      resultsNameEl.textContent = internName
        ? lang === 'es'
          ? `Career plan for ${internName}` // keep English brand wording
          : `Career plan for ${internName}`
        : '';
    }

    if (resultsNudgeEl) {
      resultsNudgeEl.textContent = buildConfidenceNudge();
    }

    if (coachSummaryEl) {
      if (!coachMode) {
        coachSummaryEl.hidden = true;
      } else {
        const today = new Date();
        const regionName = getRegionName();
        const dateStr = today.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const rolesLabel = lang === 'es' ? 'Top roles' : 'Top roles';
        const heardLabel = lang === 'es' ? 'From answers' : 'From answers';

        const rolesText = topIds
          .map((id) => {
            const c = careers[id];
            if (!c) return '';
            const t = TRANSLATIONS[lang]?.careers?.[id];
            return t?.name || c.name;
          })
          .filter(Boolean)
          .join(', ');

        coachSummaryEl.innerHTML = `
          <p class="coach-summary-title">Coach view</p>
          <p class="coach-summary-line"><strong>Intern:</strong> ${escapeHtml(internName || 'N/A')}</p>
          <p class="coach-summary-line"><strong>Region:</strong> ${escapeHtml(regionName)}</p>
          <p class="coach-summary-line"><strong>Date:</strong> ${escapeHtml(dateStr)}</p>
          <p class="coach-summary-line coach-summary-roles"><strong>${escapeHtml(rolesLabel)}:</strong> ${escapeHtml(
            rolesText || 'N/A',
          )}</p>
          ${
            userSummary
              ? `<p class="coach-summary-line"><strong>${escapeHtml(heardLabel)}:</strong> ${escapeHtml(
                  userSummary,
                )}</p>`
              : ''
          }
        `;
        coachSummaryEl.hidden = false;
      }
    }

    resultCards.innerHTML = topIds
      .map((id, index) => {
        const career = careers[id];
        const deep = deepDives[id];
        const careerT = TRANSLATIONS[lang]?.careers?.[id];
        const name = careerT?.name || career?.name;
        const short = careerT?.short || career?.short;
        if (!career || !deep) return '';

        const stepsList = deep.howToGetThere
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join('');
        const salary = getSalaryForCareer(id);

        const rankNumber = index + 1;
        const fitRing = `
          <div class="fit-ring">
            <div class="fit-ring-inner">
              <span class="fit-ring-value">${rankNumber}</span>
            </div>
          </div>
        `;

        const badges = CAREER_BADGES[id] || [];
        const badgesHtml =
          badges.length &&
          `
          <div class="badge-row">
            ${badges
              .map((key) => {
                const label = BADGE_LABELS[key] || key;
                return `<span class="badge-chip badge-${key}">${escapeHtml(label)}</span>`;
              })
              .join('')}
          </div>
        `;

        const certNames = ROLE_CERT_RECS[id] || [];
        const certItems = certNames.length ? findResourcesByNames(certNames) : [];

        return `
          <article class="result-card" data-career="${escapeHtml(id)}" tabindex="0" role="button" aria-expanded="false" aria-label="${escapeHtml(name)}">
            <div class="result-card-header">
              <span class="result-card-icon" aria-hidden="true">${career.icon}</span>
              <div class="result-card-heading">
                <h3 class="result-card-title">${escapeHtml(name)}</h3>
                <p class="result-card-short">${escapeHtml(short)}</p>
                ${badgesHtml || ''}
              </div>
              <div class="result-card-header-right">
                ${fitRing}
                <span class="result-card-toggle" aria-hidden="true">▼</span>
              </div>
            </div>
            <div class="result-card-body">
              <div class="result-card-content">
                <div class="deep-dive-section">
                  <h4>${t('results.whatIsRole')}</h4>
                  <p>${escapeHtml(deep.what)}</p>
                </div>
                <div class="deep-dive-section">
                  <h4>${t('results.dayToDay')}</h4>
                  <p>${escapeHtml(deep.dayToDay)}</p>
                </div>
                <div class="deep-dive-section">
                  <h4>${t('results.howToGetThere')}</h4>
                  <ul>${stepsList}</ul>
                </div>
                <div class="deep-dive-section">
                  <h4>${t('results.salaryRange', { region: regionName })}</h4>
                  <p>${escapeHtml(salary)}</p>
                </div>
                ${
                  userSummary
                    ? `
                <div class="deep-dive-section">
                  <h4>${lang === 'es' ? 'Tú vs este rol' : 'You vs this role'}</h4>
                  <ul class="you-vs-role">
                    <li><strong>${lang === 'es' ? 'Tú:' : 'You:'}</strong> ${escapeHtml(userSummary)}</li>
                    <li><strong>${lang === 'es' ? 'Este rol:' : 'This role:'}</strong> ${escapeHtml(short)}</li>
                  </ul>
                </div>
                `
                    : ''
                }
                ${
                  certItems.length
                    ? `
                <div class="deep-dive-section">
                  <h4>${lang === 'es' ? 'Certificaciones recomendadas' : 'Recommended certifications'}</h4>
                  <ul class="cert-list">
                    ${certItems
                      .map(
                        (item) =>
                          `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                            item.name,
                          )}</a></li>`,
                      )
                      .join('')}
                  </ul>
                </div>
                `
                    : ''
                }
                <div class="result-card-actions">
                  <button type="button" class="btn btn-resources" data-goto="resources">${t('results.seeResources')}</button>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    resultCards.querySelectorAll('.result-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-resources')) {
          e.preventDefault();
          showScreen('resources');
          return;
        }
        const expanded = card.classList.toggle('expanded');
        card.setAttribute('aria-expanded', expanded);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (e.target.closest('.btn-resources')) return;
          const expanded = card.classList.toggle('expanded');
          card.setAttribute('aria-expanded', expanded);
        }
      });
    });

    resultCards.querySelectorAll('.btn-resources').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showScreen('resources');
      });
    });

    if (roleStrip) {
      roleStrip.innerHTML = topIds
        .map((id, index) => {
          const career = careers[id];
          if (!career) return '';
          const isActive = index === 0;
          return `<button type="button" class="role-chip ${isActive ? 'role-chip--active' : ''}" data-career="${escapeHtml(
            id,
          )}" aria-label="${escapeHtml(career.name)}">${career.icon}</button>`;
        })
        .join('');

      roleStrip.querySelectorAll('.role-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const id = chip.getAttribute('data-career');
          roleStrip.querySelectorAll('.role-chip').forEach((c) => c.classList.remove('role-chip--active'));
          chip.classList.add('role-chip--active');
          const card = resultCards.querySelector(`.result-card[data-career="${CSS.escape(id)}"]`);
          if (card) {
            card.classList.add('expanded');
            card.setAttribute('aria-expanded', 'true');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    }

    const resultsTitle = $('.results-title', screens.results);
    const resultsIntro = $('.results-intro', screens.results);
    const btnResources = $('#btn-to-resources');
    const btnRetake = $('#btn-retake');
    if (resultsTitle) resultsTitle.textContent = t('results.title');
    if (resultsIntro) resultsIntro.textContent = t('results.intro');
    if (btnResources) btnResources.textContent = t('results.viewResources');
    if (btnRetake) btnRetake.textContent = t('results.retake');
  }

  function renderResources() {
    const categories = PATHWAY_DATA.resources;
    const resT = TRANSLATIONS[lang]?.resources || {};
    let recommendedSection = '';

    if (topCareerIds && topCareerIds.length) {
      const recNamesSet = new Set();
      topCareerIds.forEach((id) => {
        (ROLE_CERT_RECS[id] || []).forEach((name) => recNamesSet.add(name));
      });
      const recItems = recNamesSet.size ? findResourcesByNames(Array.from(recNamesSet)) : [];
      if (recItems.length) {
        const heading = lang === 'es' ? 'Recomendado para ti' : 'Recommended for you';
        recommendedSection = `
          <section class="resource-category resources-recommended">
            <h3 class="resource-category-title">${escapeHtml(heading)}</h3>
            <div class="resource-items">
              ${recItems
                .map(
                  (item) => `
                <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="resource-item">
                  <span class="resource-item-name">${escapeHtml(item.name)}</span>
                  <span class="resource-item-desc">${escapeHtml(item.desc)}</span>
                </a>
              `,
                )
                .join('')}
            </div>
          </section>
        `;
      }
    }

    const categoriesHtml = categories
      .map(
        (cat) => `
      <section class="resource-category">
        <h3 class="resource-category-title">${escapeHtml(resT[cat.categoryId] || cat.category)}</h3>
        <div class="resource-items">
          ${cat.items
            .map((item) => {
              const icon = RESOURCE_ICONS[item.name] || '';
              return `
                <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="resource-item">
                  ${
                    icon
                      ? `<span class="resource-item-icon" aria-hidden="true">${escapeHtml(icon)}</span>`
                      : ''
                  }
                  <span class="resource-item-text">
                    <span class="resource-item-name">${escapeHtml(item.name)}</span>
                    <span class="resource-item-desc">${escapeHtml(item.desc)}</span>
                  </span>
                </a>
              `;
            })
            .join('')}
        </div>
      </section>
    `,
      )
      .join('');

    resourcesList.innerHTML = recommendedSection + categoriesHtml;

    const resourcesTitle = $('.resources-title', screens.resources);
    const resourcesIntro = $('.resources-intro', screens.resources);
    const btnBack = $('#btn-back-to-results');
    if (resourcesTitle) resourcesTitle.textContent = t('resources.title');
    if (resourcesIntro) resourcesIntro.textContent = t('resources.intro');
    if (btnBack) btnBack.textContent = t('resources.backToResults');
  }

  function runResultsTransition() {
    const layer = $('#transition-layer');
    const steps = PATHWAY_DATA.steps;
    if (!layer) {
      showScreen('results');
      renderResultCards();
      renderNavButtons();
      updateProgress(0, 0);
      return;
    }

    layer.innerHTML = '';
    layer.classList.add('active');

    const count = 90;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'transition-star-fall';
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';
      layer.appendChild(s);
    }

    setTimeout(() => {
      layer.classList.remove('active');
      layer.innerHTML = '';
      showScreen('results');
      renderResultCards();
      renderNavButtons();
      updateProgress(0, 0);
    }, 1100);
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function goNext() {
    const steps = PATHWAY_DATA.steps;
    // Prevent moving forward if no answer selected for this step
    if (!answers[currentStep]) {
      const errorEl = $('#step-error', stepContainer);
      if (errorEl) {
        errorEl.hidden = false;
      }
      announce(
        lang === 'es'
          ? 'Respuesta requerida. Selecciona una opción antes de continuar.'
          : 'Answer required. Please choose an option before going to the next step.',
      );
      const firstOption = stepContainer.querySelector('.option');
      if (firstOption) {
        firstOption.focus();
      }
      return;
    }

    if (currentStep < steps.length) {
      currentStep++;
      renderStep();
    }
  }

  function goBack() {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }

  function reset() {
    currentStep = 0;
    answers = [];
    scores = {};
    showScreen('quiz');
    renderStep();
  }

  function bindEvents() {
    $('#btn-start')?.addEventListener('click', () => {
      showScreen('quiz');
      renderStep();
    });

    $('#btn-next')?.addEventListener('click', () => goNext());
    $('#btn-back')?.addEventListener('click', () => goBack());
    $('#btn-retake')?.addEventListener('click', () => reset());

    $('#btn-share')?.addEventListener('click', () => {
      const regionName = getRegionName();
      const topIds = topCareerIds && topCareerIds.length ? topCareerIds : getTopCareers(3);
      const careers = PATHWAY_DATA.careers;
      const lines = [];

      const nameLine = internName ? `Intern: ${internName}` : 'Intern: (name not provided)';
      lines.push(nameLine);
      lines.push(`Region: ${regionName}`);
      lines.push('');
      lines.push('Summary from your answers:');

      const summary = buildUserSummary();
      if (summary) {
        lines.push(`- ${summary}`);
      } else {
        lines.push('- You have interests across multiple areas in tech.');
      }

      lines.push('');
      lines.push('Top recommended roles:');

      topIds.forEach((id) => {
        const career = careers[id];
        if (!career) return;
        const careerT = TRANSLATIONS[lang]?.careers?.[id];
        const name = careerT?.name || career.name;
        lines.push(`- ${name}`);
      });

      lines.push('');
      lines.push('Next 30 days, focus on:');
      lines.push('- Completing at least one small project or practice task aligned with your top role.');
      lines.push('- Updating your LinkedIn or resume to reflect your target roles.');
      lines.push('- Talking to at least one alum or coach about these roles.');

      lines.push('');
      lines.push('Generated by the Tech Pathway Navigator for i.c.stars interns.');

      const subject =
        lang === 'es'
          ? `Mi plan de ruta tech - i.c.stars`
          : `My Tech Pathway plan - i.c.stars`;
      const body = encodeURIComponent(lines.join('\n'));
      const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;
    });

    $('#btn-to-resources')?.addEventListener('click', () => showScreen('resources'));
    $('#btn-back-to-results')?.addEventListener('click', () => showScreen('results'));

    $('#region-select')?.addEventListener('change', (e) => {
      region = e.target.value;
    });

    $('#intern-name')?.addEventListener('input', (e) => {
      internName = e.target.value.trim();
    });

    $('#lang-select')?.addEventListener('change', (e) => {
      lang = e.target.value;
      setDocumentLang(lang === 'es' ? 'es' : 'en');
      renderStartScreen();
      renderNavButtons();
      if (progressText && progressWrap && !progressWrap.classList.contains('hidden')) {
        updateProgress(currentStep + 1, PATHWAY_DATA.steps.length);
      }
      const activeScreen = Object.keys(screens).find((k) => screens[k]?.classList.contains('active'));
      if (activeScreen === 'results') {
        renderResultCards();
      } else if (activeScreen === 'resources') {
        renderResources();
      } else if (activeScreen === 'quiz') {
        renderStep();
      }
    });

    const feedbackOptions = document.querySelectorAll('.feedback-option');
    const feedbackThanks = $('#feedback-thanks');
    const feedbackSubmit = $('#feedback-submit');
    const feedbackText = $('#feedback-text');
    let feedbackScore = null;

    feedbackOptions.forEach((btn) => {
      btn.addEventListener('click', () => {
        feedbackOptions.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        feedbackScore = btn.getAttribute('data-score');
      });
    });

    feedbackSubmit?.addEventListener('click', () => {
      const text = feedbackText?.value?.trim() || '';
      const regionName = getRegionName();
      const topIds = topCareerIds && topCareerIds.length ? topCareerIds : getTopCareers(3);
      const careers = PATHWAY_DATA.careers;

      const roles = topIds
        .map((id) => {
          const career = careers[id];
          const careerT = TRANSLATIONS[lang]?.careers?.[id];
          return (careerT?.name || career?.name) || null;
        })
        .filter(Boolean)
        .join(', ');

      const templateParams = {
        from_name: internName || '(name not provided)',
        region: regionName,
        rating: feedbackScore ?? 'not selected',
        comments: text || '(none provided)',
        top_roles: roles,
      };

      emailjs
        .send('service_646wubo', 'template_mpddisi', templateParams)
        .then(() => {
          if (feedbackThanks) {
            feedbackThanks.hidden = false;
          }
          feedbackScore = null;
          feedbackOptions.forEach((b) => b.classList.remove('selected'));
          if (feedbackText) {
            feedbackText.value = '';
          }
        })
        .catch((err) => {
          console.error('EmailJS feedback error:', err);
        });
    });
  }

  function init() {
    createStarfield();
    region = $('#region-select')?.value || 'chicago';
    lang = $('#lang-select')?.value || 'en';
    internName = $('#intern-name')?.value?.trim() || '';
    const params = new URLSearchParams(window.location.search);
    coachMode = params.get('coach') === '1' || params.get('coach') === 'true';
    setDocumentLang(lang === 'es' ? 'es' : 'en');
    renderStartScreen();
    renderResources();
    renderNavButtons();
    bindEvents();

    const starfieldEl = $('#starfield');
    const constellationsEl = $('#constellations');

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      if (starfieldEl) {
        starfieldEl.style.transform = `translate3d(${x * 0.4}px, ${y * 0.6}px, 0)`;
      }
      if (constellationsEl) {
        constellationsEl.style.transform = `translate3d(${x * 0.3}px, ${y * 0.45}px, 0)`;
      }
    });

    skipLink?.addEventListener('click', (e) => {
      e.preventDefault();
      $('#main-content')?.focus();
    });
  }

  init();
})();
