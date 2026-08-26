import { t } from '../i18n/i18n.js';

/** Renders a friendly "coming soon" message into any placeholder screen's container. */
export function renderPlaceholder(containerId, stageLabel){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = `
    <div class="empty-state">
      <div class="ic">🚧</div>
      <div class="t">${t('coming_soon')}</div>
      <div class="d">${t('coming_soon_desc')}${stageLabel ? ' (' + stageLabel + ')' : ''}</div>
    </div>
  `;
}
