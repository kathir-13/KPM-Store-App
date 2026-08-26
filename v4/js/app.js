
/* =========================================================
   KPM — RENTAL MANAGEMENT APP (v2, Supabase backend)
========================================================= */

/* Supabase client — values are loaded from js/config.js */
const SUPABASE_URL = window.KPM_CONFIG?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.KPM_CONFIG?.SUPABASE_ANON_KEY || '';
if(!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR-PROJECT')){
  console.warn('KPM Supabase configuration is not set. Update js/config.js first.');
}
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:false }
});

/* ---------------- i18n ---------------- */
const I18N = {
  en: {
    app_name:"KPM", devotional1:"Sri Arasa Vinayagar Thunai", devotional2:"Sri Nagamman Thunai", devotional3:"Sri Thirumalai Murugan Thunai",
    login_title:"Sign in", email:"Email", password:"Password", login_btn:"Login", logout:"Logout",
    home:"Home", rentals:"Rentals", new:"New", items:"Items", reports:"Reports",
    new_rental:"New Rental", active_rentals:"Active Rentals", return_items:"Return Items", manage_items:"Manage Items",
    payments:"Payments", history:"History", user_management:"User Management", settings:"Settings",
    quick_actions:"Quick Actions", todays_rentals:"Today's Rentals", pending_items:"Pending Items", active_lbl:"Active", overdue:"Overdue",
    add_new_item:"Add New Item", all_items:"All Items", edit:"Edit", deactivate:"Deactivate", activate:"Activate",
    item_name:"Item Name", item_name_ta:"Tamil Name (optional)", total_qty:"Total Quantity", price:"Rental Price (₹)", save_item:"Save Item",
    step1_select:"Step 1 — Select Items", step2_customer:"Step 2 — Customer Details",
    customer_name:"Customer Name", mobile_number:"Mobile Number", address:"Address / Area", notes:"Notes",
    review_rental:"Review Rental", confirm_rental:"Confirm Rental", back:"Back",
    bill_no:"Bill No", rental_date:"Rental Date", product:"Product", qty:"Qty", amount:"Amount", total:"Total",
    save_bill:"Save Bill", share_bill:"Share", whatsapp_bill:"WhatsApp Bill",
    search_placeholder:"Search by name, mobile or bill no.", payment_status:"Payment Status", rental_status:"Rental Status",
    pending:"Pending", partial:"Partially Returned", completed:"Completed", paid:"Paid", partially_paid:"Partially Paid",
    rented_qty:"Rented Qty", received:"Received", mark_all_received:"✓ Mark All Received", confirm_return:"Confirm Return",
    all_items_received:"All Items Received", partially_returned:"Partially Returned / Pending", share_pending_whatsapp:"Share Pending Items on WhatsApp",
    record_payment:"Record Payment", amount_received:"Amount Received", balance:"Balance", payment_history:"Payment History",
    add_user:"Add User", full_name:"Full Name", role:"Role", admin:"Admin", staff:"Staff",
    qr_code:"Payment QR Code", upload_qr:"Upload / Change QR Image", no_internet:"No internet connection",
    saving:"Saving...", loading:"Loading...", total_amount_lbl:"TOTAL AMOUNT", amount_to_collect:"AMOUNT TO COLLECT",
    today:"Today", this_week:"This Week", this_month:"This Month", all:"All"
  },
  ta: {
    app_name:"KPM", devotional1:"ஸ்ரீ அரச விநாயகர் துணை", devotional2:"ஸ்ரீ நாகம்மன் துணை", devotional3:"ஸ்ரீ திருமலை முருகன் துணை",
    login_title:"உள்நுழைய", email:"மின்னஞ்சல்", password:"கடவுச்சொல்", login_btn:"உள்நுழை", logout:"வெளியேறு",
    home:"முகப்பு", rentals:"வாடகைகள்", new:"புதிய", items:"பொருட்கள்", reports:"அறிக்கைகள்",
    new_rental:"புதிய வாடகை", active_rentals:"நடப்பு வாடகைகள்", return_items:"பொருட்கள் திரும்ப", manage_items:"பொருட்களை நிர்வகி",
    payments:"பணம் செலுத்துதல்", history:"வரலாறு", user_management:"பயனர் மேலாண்மை", settings:"அமைப்புகள்",
    quick_actions:"விரைவு செயல்கள்", todays_rentals:"இன்றைய வாடகைகள்", pending_items:"நிலுவை பொருட்கள்", active_lbl:"நடப்பு", overdue:"தாமதம்",
    add_new_item:"புதிய பொருள் சேர்", all_items:"அனைத்து பொருட்கள்", edit:"திருத்து", deactivate:"செயலிழக்க", activate:"செயல்படுத்து",
    item_name:"பொருள் பெயர்", item_name_ta:"தமிழ் பெயர் (விருப்பம்)", total_qty:"மொத்த அளவு", price:"வாடகை விலை (₹)", save_item:"சேமி",
    step1_select:"படி 1 — பொருட்களை தேர்வு செய்", step2_customer:"படி 2 — வாடிக்கையாளர் விவரம்",
    customer_name:"வாடிக்கையாளர் பெயர்", mobile_number:"மொபைல் எண்", address:"முகவரி / பகுதி", notes:"குறிப்புகள்",
    review_rental:"வாடகையை சரிபார்", confirm_rental:"வாடகையை உறுதிப்படுத்து", back:"பின்",
    bill_no:"பில் எண்", rental_date:"வாடகை தேதி", product:"பொருள்", qty:"எண்ணிக்கை", amount:"தொகை", total:"மொத்தம்",
    save_bill:"பில் சேமி", share_bill:"பகிர்", whatsapp_bill:"வாட்ஸ்அப் பில்",
    search_placeholder:"பெயர், மொபைல் அல்லது பில் எண் தேடு", payment_status:"பணம் நிலை", rental_status:"வாடகை நிலை",
    pending:"நிலுவை", partial:"பகுதி திரும்பியது", completed:"முடிந்தது", paid:"செலுத்தப்பட்டது", partially_paid:"பகுதி செலுத்தப்பட்டது",
    rented_qty:"வாடகை எண்ணிக்கை", received:"பெறப்பட்டது", mark_all_received:"✓ அனைத்தும் பெறப்பட்டது", confirm_return:"திரும்ப உறுதிப்படுத்து",
    all_items_received:"அனைத்து பொருட்களும் பெறப்பட்டன", partially_returned:"பகுதி திரும்பியது / நிலுவை", share_pending_whatsapp:"நிலுவை பொருட்களை வாட்ஸ்அப்பில் பகிர்",
    record_payment:"பணம் பதிவு செய்", amount_received:"பெறப்பட்ட தொகை", balance:"மீதி", payment_history:"பணம் வரலாறு",
    add_user:"பயனர் சேர்", full_name:"முழு பெயர்", role:"பங்கு", admin:"நிர்வாகி", staff:"பணியாளர்",
    qr_code:"QR கோட்", upload_qr:"QR படத்தை பதிவேற்று", no_internet:"இணைய இணைப்பு இல்லை",
    saving:"சேமிக்கிறது...", loading:"ஏற்றுகிறது...", total_amount_lbl:"மொத்த தொகை", amount_to_collect:"வசூலிக்க வேண்டிய தொகை",
    today:"இன்று", this_week:"இந்த வாரம்", this_month:"இந்த மாதம்", all:"அனைத்தும்"
  }
};
let currentLang = localStorage.getItem('kpm_lang') || 'en';
function t(key){ return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key; }
function setLang(lang){
  currentLang = lang;
  localStorage.setItem('kpm_lang', lang);
  applyStaticI18n();
  renderScreen(currentScreen);
}
function applyStaticI18n(){
  document.getElementById('langEnBtn').classList.toggle('active', currentLang==='en');
  document.getElementById('langTaBtn').classList.toggle('active', currentLang==='ta');
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.getElementById('dashShopName').textContent = t('app_name');
  document.getElementById('loginTitleShop').textContent = t('app_name');
  document.getElementById('lblEmail').textContent = t('email');
  document.getElementById('lblPassword').textContent = t('password');
  document.getElementById('loginBtn').textContent = t('login_btn');
  document.getElementById('addItemBtn').innerHTML = '➕ ' + t('add_new_item');
  document.getElementById('allItemsLabel').textContent = t('all_items');
  document.getElementById('step1Label').textContent = t('step1_select');
  document.getElementById('step2Label').textContent = t('step2_customer');
  document.getElementById('lblCustName').textContent = t('customer_name') + ' *';
  document.getElementById('lblMobile').textContent = t('mobile_number') + ' *';
  document.getElementById('lblAddress').textContent = t('address');
  document.getElementById('lblNotes').textContent = t('notes');
  document.getElementById('estAmtLbl').textContent = t('total_amount_lbl');
  document.getElementById('reviewBtn').textContent = t('review_rental');
  document.getElementById('qrLabel').textContent = t('qr_code');
  document.getElementById('uploadQrLbl').textContent = t('upload_qr');
  document.getElementById('logoutLbl2').textContent = t('logout');
}

/* ---------------- Global state ---------------- */
let currentUser = null;      // supabase auth user
let currentProfile = null;   // {id, full_name, role, active}
let SCREENS = ['login','dashboard','items','new-rental','review','active','detail','return-summary','history','reports','users','settings'];
let NAV_SCREENS = ['dashboard','active','new-rental','items','reports'];
let navStack = ['dashboard'];
let currentScreen = 'login';
let ITEMS_CACHE = [];
let OUTSTANDING_CACHE = {};
let newRentalSelections = {}; // itemId -> qty
let reviewData = null;
let currentDetailId = null;
let currentReturnEventLines = null;
let pendingItemPhotoFile = null;
let editingItemId = null;
let historyStatusFilter = 'ALL';
let reportRange = 'today';
let reportsChartRentals = null, reportsChartPayments = null;

/* ---------------- Utils ---------------- */
function money(n){ n = Math.round(n||0); return '₹' + n.toLocaleString('en-IN'); }
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(el._h); el._h = setTimeout(()=>el.classList.remove('show'), 2400);
}
function fmtDate(iso){ if(!iso) return '—'; return new Date(iso).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function fmtDateTime(iso){ if(!iso) return '—'; const d=new Date(iso); return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short'})+', '+d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}); }
function escapeHtml(s){ return (s||'').toString().replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function uid(){ return 'x'+Date.now().toString(36)+Math.random().toString(36).slice(2,8); }
function emptyState(ic,tt,d){ return `<div class="empty-state"><div class="ic">${ic}</div><div class="t">${tt}</div><div class="d">${d}</div></div>`; }
function showLoading(msg){ document.getElementById('loadingText').textContent = msg||t('loading'); document.getElementById('loadingOverlay').style.display='flex'; }
function hideLoading(){ document.getElementById('loadingOverlay').style.display='none'; }
function validMobile(m){ return /^[6-9]\d{9}$/.test((m||'').replace(/\D/g,'')); }
function waLink(mobile, text){
  let digits = (mobile||'').replace(/\D/g,'');
  if(digits.length===10) digits = '91'+digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
async function guardedAction(btn, fn){
  if(btn){ if(btn.disabled) return; btn.disabled = true; }
  try{ await fn(); }
  catch(e){ console.error(e); alert(e.message || 'Something went wrong. Please try again.'); }
  finally{ if(btn) btn.disabled = false; }
}

/* ---------------- Offline detection ---------------- */
function updateOnlineStatus(){
  const b = document.getElementById('offlineBanner');
  if(!navigator.onLine){ b.textContent = '⚠ ' + t('no_internet'); b.classList.add('show'); }
  else b.classList.remove('show');
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

/* =========================================================
   AUTH
========================================================= */
async function initAuth(){
  const { data:{ session } } = await sb.auth.getSession();
  if(session){ await onLoggedIn(session.user); }
  else { showLoginScreen(); }
  sb.auth.onAuthStateChange((event, session)=>{
    if(event==='SIGNED_OUT'){ showLoginScreen(); }
  });
}
function showLoginScreen(){
  currentUser = null; currentProfile = null;
  document.getElementById('topbar').style.display='none';
  document.getElementById('bottomnav').style.display='none';
  SCREENS.forEach(s=>document.getElementById('screen-'+s)?.classList.remove('active'));
  document.getElementById('screen-login').classList.add('active');
  currentScreen = 'login';
  applyStaticI18n();
}
async function onLoggedIn(user){
  currentUser = user;
  const { data:profile, error } = await sb.from('profiles').select('*').eq('id', user.id).single();
  if(error || !profile || !profile.active){
    await sb.auth.signOut();
    alert('Your account is not active. Please contact your Admin.');
    showLoginScreen();
    return;
  }
  currentProfile = profile;
  document.getElementById('topbar').style.display='flex';
  document.getElementById('bottomnav').style.display='flex';
  applyStaticI18n();
  navStack = ['dashboard'];
  nav('dashboard', false);
}
async function handleLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  errEl.style.display='none';
  if(!email || !password){ errEl.textContent='Please enter email and password'; errEl.style.display='block'; return; }
  const btn = document.getElementById('loginBtn');
  btn.disabled = true; btn.textContent = t('saving');
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  btn.disabled = false; btn.textContent = t('login_btn');
  if(error){ errEl.textContent = error.message; errEl.style.display='block'; return; }
  await onLoggedIn(data.user);
}
async function handleLogout(){
  if(!confirm('Logout?')) return;
  await sb.auth.signOut();
  showLoginScreen();
}

/* =========================================================
   NAVIGATION
========================================================= */
function nav(screen, push=true){
  if(!currentUser && screen!=='login') return;
  SCREENS.forEach(s=>{ const el=document.getElementById('screen-'+s); if(el) el.classList.toggle('active', s===screen); });
  const titleMap = {
    dashboard:t('app_name'), items:t('manage_items'), 'new-rental':t('new_rental'), review:t('review_rental'),
    active:t('active_rentals'), detail:t('bill_no'), 'return-summary':t('return_items'), history:t('history'),
    reports:t('reports'), users:t('user_management'), settings:t('settings')
  };
  document.getElementById('screenTitle').textContent = titleMap[screen] || t('app_name');
  document.querySelectorAll('#bottomnav button').forEach(b=> b.classList.toggle('active', b.dataset.s===screen));
  document.getElementById('backBtn').style.visibility = NAV_SCREENS.includes(screen) ? 'hidden' : 'visible';
  if(push){ if(navStack[navStack.length-1]!==screen) navStack.push(screen); }
  currentScreen = screen;
  renderScreen(screen);
  window.scrollTo(0,0);
}
function goBack(){
  if(navStack.length>1){ navStack.pop(); nav(navStack[navStack.length-1], false); }
  else nav('dashboard', false);
}
function renderScreen(screen){
  if(screen==='dashboard') renderDashboard();
  else if(screen==='items') renderItems();
  else if(screen==='new-rental') renderNewRentalScreen();
  else if(screen==='review') renderReviewScreen();
  else if(screen==='active') renderActive();
  else if(screen==='detail') renderDetail();
  else if(screen==='return-summary') renderReturnSummary();
  else if(screen==='history') renderHistory();
  else if(screen==='reports') renderReports();
  else if(screen==='users') renderUsers();
  else if(screen==='settings') renderSettings();
}

/* =========================================================
   DATA HELPERS
========================================================= */
async function loadItemsAndStock(includeInactive=false){
  const { data: items, error } = await sb.from('items').select('*').order('name');
  if(error) throw error;
  ITEMS_CACHE = includeInactive ? items : items.filter(i=>i.active);
  const { data: lines, error: e2 } = await sb.from('rental_items')
    .select('item_id, qty, received_qty, rentals!inner(rental_status)')
    .neq('rentals.rental_status', 'COMPLETED');
  if(e2) throw e2;
  OUTSTANDING_CACHE = {};
  (lines||[]).forEach(li=>{
    OUTSTANDING_CACHE[li.item_id] = (OUTSTANDING_CACHE[li.item_id]||0) + Math.max(0, li.qty - li.received_qty);
  });
  return items;
}
function availableQty(item){
  return Math.max(0, item.total_qty - (OUTSTANDING_CACHE[item.id]||0));
}

/* =========================================================
   DASHBOARD
========================================================= */
async function renderDashboard(){
  document.getElementById('dashTiles').innerHTML = `
    <button class="tile primary" onclick="nav('new-rental')"><span class="ic">➕</span><span class="lbl">${t('new_rental')}</span></button>
    <button class="tile" onclick="nav('active')"><span class="ic">📦</span><span class="lbl">${t('active_rentals')}</span></button>
    <button class="tile" onclick="nav('active')"><span class="ic">↩️</span><span class="lbl">${t('return_items')}</span></button>
    <button class="tile" onclick="nav('items')"><span class="ic">🍽️</span><span class="lbl">${t('manage_items')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">💰</span><span class="lbl">${t('payments')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">📜</span><span class="lbl">${t('history')}</span></button>
    <button class="tile" onclick="nav('reports')"><span class="ic">📊</span><span class="lbl">${t('reports')}</span></button>
    ${currentProfile.role==='admin' ? `<button class="tile" onclick="nav('users')"><span class="ic">👤</span><span class="lbl">${t('user_management')}</span></button>` : ''}
    <button class="tile" onclick="nav('settings')"><span class="ic">⚙️</span><span class="lbl">${t('settings')}</span></button>
  `;
  showLoading();
  try{
    const { data: active, error } = await sb.from('rentals').select('*, rental_items(qty, received_qty)').in('rental_status',['ACTIVE','PARTIALLY_RETURNED']);
    if(error) throw error;
    const pendingItemsCount = (active||[]).reduce((sum,r)=> sum + r.rental_items.reduce((s,li)=>s+Math.max(0,li.qty-li.received_qty),0), 0);
    const { data: balances, error: balErr } = await sb.from('rentals').select('total_amount, amount_received');
    if(balErr) throw balErr;
    const outstanding = (balances||[]).reduce((sum,r)=>sum + Math.max(0, Number(r.total_amount||0)-Number(r.amount_received||0)),0);
    document.getElementById('dashAlerts').innerHTML='';
    document.getElementById('dashStats').innerHTML = `
      <div class="stat"><div class="n num">${(active||[]).length}</div><div class="l">${t('active_rentals')}</div></div>
      <div class="stat warn"><div class="n num">${pendingItemsCount}</div><div class="l">${t('pending_items')}</div></div>
      <div class="stat danger" style="grid-column:1/-1"><div class="n num">${money(outstanding)}</div><div class="l">Outstanding Payment</div></div>
    `;
  }catch(e){ console.error(e); document.getElementById('dashStats').innerHTML = `<div class="alert danger" style="grid-column:1/-1;">${e.message}</div>`; }
  hideLoading();
}

/* =========================================================
   ITEMS
========================================================= */
async function renderItems(){
  const isAdmin = currentProfile && currentProfile.role==='admin';
  const addBtn = document.getElementById('addItemBtn');
  if(addBtn) addBtn.style.display = isAdmin ? 'flex' : 'none';
  showLoading();
  try{ await loadItemsAndStock(true); }catch(e){ toast(e.message); hideLoading(); return; }
  hideLoading();
  const list = document.getElementById('itemsList');
  if(ITEMS_CACHE.length===0){ list.innerHTML = emptyState('🍽️','No items yet','Tap "Add New Item" to get started'); return; }
  list.innerHTML = ITEMS_CACHE.map(item=>{
    const rented = OUTSTANDING_CACHE[item.id]||0;
    const avail = availableQty(item);
    const thumb = item.photo_url ? `<img src="${item.photo_url}">` : '🍽️';
    return `
      <div class="item-card">
        <div class="item-thumb">${thumb}</div>
        <div class="item-info">
          <div class="nm">${escapeHtml(item.name)} ${item.name_ta?`<span class="nmta">(${escapeHtml(item.name_ta)})</span>`:''}</div>
          <div class="sub">${money(item.price)}</div>
          <div class="stockline">
            <span class="tot">Total ${item.total_qty}</span>
            ${item.active? `<span class="${avail<=0?'zero':'avail'}">Avail ${avail}</span>` : `<span class="inactive">Inactive</span>`}
            ${rented>0?`<span class="rented">Rented ${rented}</span>`:''}
          </div>
        </div>
        ${isAdmin ? `<div style="display:flex;flex-direction:column;gap:6px;">
          <button class="btn btn-outline btn-sm" onclick="openItemForm('${item.id}')">${t('edit')}</button>
          <button class="btn ${item.active?'btn-danger-outline':'btn-outline'} btn-sm" onclick="toggleItemActive('${item.id}', ${!item.active})">${item.active?t('deactivate'):t('activate')}</button>
        </div>` : ''}
      </div>
    `;
  }).join('');
}
function openItemForm(itemId){
  editingItemId = itemId || null;
  const item = itemId ? ITEMS_CACHE.find(i=>i.id===itemId) : null;
  pendingItemPhotoFile = null;
  const html = `
    <div class="modal-header"><h3>${item ? t('edit') : t('add_new_item')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="photo-upload" id="itemPhotoUpload" onclick="document.getElementById('itemPhotoInput').click()">
      ${item && item.photo_url ? `<img src="${item.photo_url}">` : `<span style="font-size:26px;">📷</span><span class="lbl">Take / Upload Photo</span>`}
    </div>
    <input type="file" accept="image/*" capture="environment" id="itemPhotoInput" style="display:none" onchange="handleItemPhotoSelect(event)">
    <div class="field"><label>${t('item_name')} *</label><input type="text" id="itemNameInput" value="${item?escapeHtml(item.name):''}" placeholder="e.g. Chair"></div>
    <div class="field"><label>${t('item_name_ta')}</label><input type="text" id="itemNameTaInput" value="${item&&item.name_ta?escapeHtml(item.name_ta):''}" placeholder="தமிழில் பெயர்"></div>
    <div class="row2">
      <div class="field"><label>${t('total_qty')} *</label><input type="number" id="itemQtyInput" min="0" value="${item?item.total_qty:''}" placeholder="e.g. 100"></div>
      <div class="field"><label>${t('price')} *</label><input type="number" id="itemPriceInput" min="0" value="${item?item.price:''}" placeholder="e.g. 5"></div>
    </div>
    <button class="btn btn-brass btn-block" id="saveItemBtn" onclick="saveItemForm()">${t('save_item')}</button>
  `;
  openModal(html);
}
function handleItemPhotoSelect(e){
  const file = e.target.files[0];
  if(!file) return;
  pendingItemPhotoFile = file;
  const reader = new FileReader();
  reader.onload = ev=>{ document.getElementById('itemPhotoUpload').innerHTML = `<img src="${ev.target.result}">`; };
  reader.readAsDataURL(file);
}
function resizeImageFile(file, maxDim){
  return new Promise((resolve)=>{
    const reader = new FileReader();
    reader.onload = e=>{
      const img = new Image();
      img.onload = ()=>{
        let w=img.width, h=img.height;
        if(w>h){ if(w>maxDim){ h=Math.round(h*maxDim/w); w=maxDim; } } else { if(h>maxDim){ w=Math.round(w*maxDim/h); h=maxDim; } }
        const canvas = document.createElement('canvas'); canvas.width=w; canvas.height=h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        canvas.toBlob(blob=>resolve(blob), 'image/jpeg', 0.7);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
async function saveItemForm(){
  const name = document.getElementById('itemNameInput').value.trim();
  const nameTa = document.getElementById('itemNameTaInput').value.trim();
  const qty = parseInt(document.getElementById('itemQtyInput').value);
  const price = parseFloat(document.getElementById('itemPriceInput').value);
  if(!name){ toast('Please enter item name'); return; }
  if(isNaN(qty) || qty<0){ toast('Please enter valid quantity'); return; }
  if(isNaN(price) || price<0){ toast('Please enter valid price'); return; }
  const btn = document.getElementById('saveItemBtn');
  btn.disabled = true; btn.textContent = t('saving');
  try{
    let photoUrl = editingItemId ? (ITEMS_CACHE.find(i=>i.id===editingItemId)||{}).photo_url : null;
    if(pendingItemPhotoFile){
      const blob = await resizeImageFile(pendingItemPhotoFile, 500);
      const path = `${Date.now()}_${uid()}.jpg`;
      const { error: upErr } = await sb.storage.from('item-photos').upload(path, blob, { contentType:'image/jpeg' });
      if(upErr) throw upErr;
      const { data: pub } = sb.storage.from('item-photos').getPublicUrl(path);
      photoUrl = pub.publicUrl;
    }
    if(editingItemId){
      const { error } = await sb.from('items').update({ name, name_ta:nameTa||null, total_qty:qty, price, photo_url:photoUrl }).eq('id', editingItemId);
      if(error) throw error;
    } else {
      const { error } = await sb.from('items').insert({ name, name_ta:nameTa||null, total_qty:qty, price, photo_url:photoUrl, active:true });
      if(error) throw error;
    }
    closeModal();
    toast('Item saved');
    renderItems();
  }catch(e){ alert(e.message); btn.disabled=false; btn.textContent = t('save_item'); }
}
async function toggleItemActive(itemId, makeActive){
  if(!makeActive && !confirm('Deactivate this item? It will be hidden from new rentals but history stays intact.')) return;
  showLoading();
  try{
    const { error } = await sb.from('items').update({ active: makeActive }).eq('id', itemId);
    if(error) throw error;
    toast(makeActive?'Item activated':'Item deactivated');
    await renderItems();
  }catch(e){ alert(e.message); }
  hideLoading();
}

/* =========================================================
   NEW RENTAL
========================================================= */
async function renderNewRentalScreen(){
  newRentalSelections = {};
  document.getElementById('nrName').value='';
  document.getElementById('nrMobile').value='';
  document.getElementById('nrAddress').value='';
  document.getElementById('nrNotes').value='';
  showLoading();
  try{ await loadItemsAndStock(false); }catch(e){ toast(e.message); }
  hideLoading();
  renderPickItems();
  updateNewRentalTotal();
}
function renderPickItems(){
  const list = document.getElementById('pickItemsList');
  if(ITEMS_CACHE.length===0){ list.innerHTML = emptyState('🍽️','No items available','Add items first from the Items screen'); return; }
  list.innerHTML = ITEMS_CACHE.map(item=>{
    const avail = availableQty(item);
    const qty = newRentalSelections[item.id] || 0;
    const thumb = item.photo_url ? `<img src="${item.photo_url}">` : '🍽️';
    const lineAmt = qty*item.price;
    return `
      <div class="pick-card ${qty>0?'selected':''}" id="pick-${item.id}">
        <div class="pick-top">
          <div class="item-thumb">${thumb}</div>
          <div class="item-info">
            <div class="nm">${escapeHtml(item.name)}</div>
            <div class="price">${money(item.price)}</div>
            <div class="avail-tag ${avail<=0?'low':''}">${avail<=0?'Out of stock':'Available: '+avail}</div>
          </div>
          <div class="stepper">
            <button onclick="adjustPick('${item.id}',-1)" ${qty<=0?'disabled':''}>−</button>
            <span class="qty num" id="qty-${item.id}">${qty}</span>
            <button onclick="adjustPick('${item.id}',1)" ${avail<=qty?'disabled':''}>+</button>
          </div>
        </div>
        ${qty>0?`<div class="pick-bottom"><span style="font-size:12px;color:var(--muted);">${qty} × ${money(item.price)}</span><span class="lineamt num" id="lineamt-${item.id}">${money(lineAmt)}</span></div>`:''}
      </div>
    `;
  }).join('');
}
function adjustPick(itemId, delta){
  const item = ITEMS_CACHE.find(i=>i.id===itemId);
  const avail = availableQty(item);
  let qty = (newRentalSelections[itemId]||0) + delta;
  if(qty<0) qty=0; if(qty>avail) qty=avail;
  newRentalSelections[itemId] = qty;
  renderPickItems();
  updateNewRentalTotal();
}
function updateNewRentalTotal(){
  let itemCount=0, total=0;
  Object.keys(newRentalSelections).forEach(id=>{
    const qty = newRentalSelections[id];
    if(qty>0){ const item = ITEMS_CACHE.find(i=>i.id===id); if(item){ itemCount+=qty; total += qty*item.price; } }
  });
  const box = document.getElementById('nrTotalBox');
  box.querySelector('.val').textContent = money(total);
  document.getElementById('estAmtSub').textContent = itemCount===0 ? 'Select items to see total' : `${itemCount} item(s) selected`;
}
function goToReview(){
  const name = document.getElementById('nrName').value.trim();
  const mobile = document.getElementById('nrMobile').value.trim();
  const address = document.getElementById('nrAddress').value.trim();
  const notes = document.getElementById('nrNotes').value.trim();
  const selectedIds = Object.keys(newRentalSelections).filter(id=>newRentalSelections[id]>0);
  if(selectedIds.length===0){ toast('Please select at least one item'); return; }
  if(!name){ toast('Please enter customer name'); return; }
  if(!validMobile(mobile)){ toast('Please enter a valid 10-digit mobile number'); return; }
  const lines = selectedIds.map(id=>{
    const item = ITEMS_CACHE.find(i=>i.id===id);
    return { item_id:id, item_name:item.name, price:item.price, qty:newRentalSelections[id] };
  });
  const total = lines.reduce((s,l)=>s+l.qty*l.price,0);
  reviewData = { name, mobile, address, notes, lines, total };
  nav('review');
}
function renderReviewScreen(){
  if(!reviewData){ nav('new-rental', false); return; }
  const el = document.getElementById('reviewContent');
  el.innerHTML = `
    <div class="card">
      <div class="section-label" style="margin-top:0;">${t('customer_name')}</div>
      <p style="font-weight:700; font-size:15px;">${escapeHtml(reviewData.name)}</p>
      <p style="font-size:13px; color:var(--muted); margin-top:2px;">${escapeHtml(reviewData.mobile)} ${reviewData.address?(' • '+escapeHtml(reviewData.address)):''}</p>
      ${reviewData.notes?`<p style="font-size:12.5px; color:var(--ink-soft); margin-top:6px;">${escapeHtml(reviewData.notes)}</p>`:''}
    </div>
    <div class="section-label">${t('product')}</div>
    <div class="card">
      <table class="bill-table">
        <thead><tr><th>${t('product')}</th><th class="num">${t('qty')}</th><th class="num">${t('amount')}</th></tr></thead>
        <tbody>
          ${reviewData.lines.map(l=>`<tr><td>${escapeHtml(l.item_name)}</td><td class="num">${l.qty}</td><td class="num">${money(l.qty*l.price)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="total-box"><div class="lbl">${t('total_amount_lbl')}</div><div class="val num">${money(reviewData.total)}</div></div>
    <div style="display:flex; gap:10px;">
      <button class="btn btn-outline btn-block" onclick="nav('new-rental', false)">${t('back')}</button>
      <button class="btn btn-brass btn-block" id="confirmRentalBtn" onclick="confirmRental()">${t('confirm_rental')}</button>
    </div>
  `;
}
async function confirmRental(){
  const btn = document.getElementById('confirmRentalBtn');
  if(btn.disabled) return;
  btn.disabled = true; btn.textContent = t('saving');
  try{
    const payloadItems = reviewData.lines.map(l=>({ item_id:l.item_id, item_name:l.item_name, price:l.price, qty:l.qty }));
    const { data, error } = await sb.rpc('create_rental', {
      p_customer_name: reviewData.name, p_mobile: reviewData.mobile,
      p_address: reviewData.address||null, p_notes: reviewData.notes||null,
      p_items: payloadItems
    });
    if(error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    reviewData = null;
    newRentalSelections = {};
    toast('Rental created — Bill ' + row.bill_no);
    currentDetailId = row.id;
    navStack = ['dashboard','active'];
    nav('detail');
  }catch(e){
    alert(e.message);
    btn.disabled = false; btn.textContent = t('confirm_rental');
  }
}

/* =========================================================
   ACTIVE RENTALS
========================================================= */
function rentalPendingCount(r){
  return (r.rental_items||[]).reduce((s,li)=>s+Math.max(0, li.qty-li.received_qty), 0);
}
async function renderActive(){
  showLoading();
  const el = document.getElementById('activeList');
  try{
    const { data, error } = await sb.from('rentals').select('*, rental_items(qty, received_qty)').in('rental_status',['ACTIVE','PARTIALLY_RETURNED']).order('rental_date',{ascending:false});
    if(error) throw error;
    let list = data||[];
    const q = (document.getElementById('activeSearch').value||'').toLowerCase();
    const dateFilter = document.getElementById('activeDateFilter').value;
    if(q) list = list.filter(r=> r.customer_name.toLowerCase().includes(q) || r.mobile.includes(q) || r.bill_no.toLowerCase().includes(q));
    if(dateFilter) list = list.filter(r=> r.rental_date.slice(0,10)===dateFilter);
    list.sort((a,b)=> rentalPendingCount(b)-rentalPendingCount(a));
    if(list.length===0){ el.innerHTML = emptyState('📦','No active rentals', q||dateFilter?'No results found':'New rentals will appear here'); hideLoading(); return; }
    el.innerHTML = list.map(r=>renderRentalCard(r)).join('');
  }catch(e){ el.innerHTML = `<div class="alert danger">${e.message}</div>`; }
  hideLoading();
}
function renderRentalCard(r){
  const pending = rentalPendingCount(r);
  return `
    <div class="rental-card" onclick="openDetail('${r.id}')">
      <div class="top-row">
        <div><div class="cust">${escapeHtml(r.customer_name)}</div><div class="phone">${escapeHtml(r.mobile)}</div></div>
        <div class="badges">
          <span class="badge st-${r.rental_status}">${t(r.rental_status==='ACTIVE'?'active_lbl':r.rental_status==='PARTIALLY_RETURNED'?'partial':'completed')}</span>
          <span class="badge pay-${r.payment_status}">${t(r.payment_status==='PENDING'?'pending':r.payment_status==='PARTIALLY_PAID'?'partially_paid':'paid')}</span>
        </div>
      </div>
      <div class="meta">Bill #${escapeHtml(r.bill_no)} • ${fmtDateTime(r.rental_date)}</div>
      <div class="bottom-row">
        <span style="font-size:12px;color:var(--muted);">${pending>0?pending+' pending items':'All items back'}</span>
        <span class="amt num">${money(r.total_amount)}</span>
      </div>
    </div>
  `;
}

/* =========================================================
   RENTAL DETAIL (bill + returns + payments)
========================================================= */
function openDetail(id){ currentDetailId = id; nav('detail'); }
async function fetchRentalFull(id){
  const { data: rental, error } = await sb.from('rentals').select('*').eq('id', id).single();
  if(error) throw error;
  const { data: lines, error: e2 } = await sb.from('rental_items').select('*').eq('rental_id', id).order('created_at');
  if(e2) throw e2;
  const { data: pays, error: e3 } = await sb.from('payments').select('*').eq('rental_id', id).order('paid_at');
  if(e3) throw e3;
  return { rental, lines, pays };
}
async function renderDetail(){
  const el = document.getElementById('detailContent');
  showLoading();
  let full;
  try{ full = await fetchRentalFull(currentDetailId); }
  catch(e){ el.innerHTML = `<div class="alert danger">${e.message}</div>`; hideLoading(); return; }
  hideLoading();
  const { rental:r, lines, pays } = full;
  const balance = r.total_amount - r.amount_received;
  const pendingLines = lines.filter(li=>li.qty>li.received_qty);

  const billText = `${t('app_name')}\nBill No: ${r.bill_no}\n\n` +
    lines.map(l=>`${l.item_name} - ${l.qty} - ${money(l.qty*l.price)}`).join('\n') +
    `\n\nTotal: ${money(r.total_amount)}`;

  el.innerHTML = `
    <div class="card">
      <div class="bill-header">
        <div class="shop">${t('app_name')}</div>
        <div class="billno">${t('bill_no')}: ${escapeHtml(r.bill_no)}</div>
      </div>
      <div class="divider"></div>
      <div style="font-size:13px; line-height:1.8;">
        <b>${escapeHtml(r.customer_name)}</b><br>
        ${escapeHtml(r.mobile)} ${r.address?(' • '+escapeHtml(r.address)):''}<br>
        ${t('rental_date')}: ${fmtDateTime(r.rental_date)}
        ${r.notes?('<br>'+escapeHtml(r.notes)):''}
      </div>
      <div class="divider"></div>
      <table class="bill-table">
        <thead><tr><th>${t('product')}</th><th class="num">${t('qty')}</th><th class="num">${t('amount')}</th></tr></thead>
        <tbody>${lines.map(l=>`<tr><td>${escapeHtml(l.item_name)}</td><td class="num">${l.qty}</td><td class="num">${money(l.qty*l.price)}</td></tr>`).join('')}</tbody>
      </table>
      <div class="divider"></div>
      <div style="display:flex; justify-content:space-between; font-weight:800; font-size:16px;">
        <span>${t('total')}</span><span class="num">${money(r.total_amount)}</span>
      </div>
      <div style="display:flex; gap:8px; margin-top:14px;">
        <span class="badge st-${r.rental_status}">${t(r.rental_status==='ACTIVE'?'active_lbl':r.rental_status==='PARTIALLY_RETURNED'?'partial':'completed')}</span>
        <span class="badge pay-${r.payment_status}">${t(r.payment_status==='PENDING'?'pending':r.payment_status==='PARTIALLY_PAID'?'partially_paid':'paid')}</span>
      </div>
    </div>

    <div style="display:flex; gap:8px; margin-bottom:12px;">
      <button class="btn btn-whatsapp btn-block btn-sm" onclick="window.open('${waLink(r.mobile, billText)}','_blank')">💬 ${t('whatsapp_bill')}</button>
      <button class="btn btn-outline btn-block btn-sm" onclick="window.print()">🖨️ ${t('save_bill')}</button>
    </div>

    ${r.rental_status!=='COMPLETED' ? `
    <div class="section-label">${t('return_items')}</div>
    <div class="card" id="returnLinesCard">
      ${lines.map((li,idx)=>{
        const pendingQ = li.qty - li.received_qty;
        if(pendingQ<=0){ return `<div class="return-row"><div class="nm">${escapeHtml(li.item_name)}</div><div class="done-tag">✓ ${t('received')} (${li.qty})</div></div>`; }
        return `
          <div class="return-row">
            <div class="nm">${escapeHtml(li.item_name)}</div>
            <div class="sub">${t('rented_qty')}: ${li.qty} · ${t('received')}: ${li.received_qty} · ${t('pending')}: ${pendingQ}</div>
            <div class="ctrl">
              <input type="number" min="0" max="${pendingQ}" value="${pendingQ}" id="retinput-${idx}" data-line="${li.id}" data-pending="${pendingQ}">
              <button class="btn btn-outline btn-sm" onclick="document.getElementById('retinput-${idx}').value=${pendingQ}">${t('mark_all_received')}</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <button class="btn btn-success btn-block" id="confirmReturnBtn" style="margin-bottom:16px;" onclick="submitReturn()">${t('confirm_return')}</button>
    ` : ''}

    <div class="section-label">${t('payments')}</div>
    <div class="card">
      <div class="balance-box"><span class="l">${t('total_amount_lbl')}</span><span class="v num">${money(r.total_amount)}</span></div>
      <div class="balance-box"><span class="l">${t('amount_received')}</span><span class="v num">${money(r.amount_received)}</span></div>
      <div class="balance-box"><span class="l">${t('balance')}</span><span class="v num" style="color:${balance>0?'var(--danger)':'var(--success)'}">${money(balance)}</span></div>
    </div>
    ${balance>0 ? `<button class="btn btn-brass btn-block" style="margin-bottom:12px;" onclick="openPaymentForm('${r.id}', ${balance})">💰 ${t('record_payment')}</button>` : ''}

    ${pays.length>0 ? `
    <div class="section-label">${t('payment_history')}</div>
    <div class="card">
      ${pays.map(p=>`<div class="balance-box"><span class="l">${fmtDateTime(p.paid_at)}${p.note?(' — '+escapeHtml(p.note)):''}</span><span class="v num">${money(p.amount)}</span></div>`).join('')}
    </div>` : ''}

    ${pendingLines.length>0 ? `
    <button class="btn btn-whatsapp btn-block" style="margin-top:4px;" onclick="sharePendingWhatsapp('${r.id}')">💬 ${t('share_pending_whatsapp')}</button>
    ` : ''}
  `;
}
async function submitReturn(){
  const btn = document.getElementById('confirmReturnBtn');
  if(btn.disabled) return;
  btn.disabled = true; btn.textContent = t('saving');
  try{
    const inputs = document.querySelectorAll('#returnLinesCard input[data-line]');
    const lines = [];
    inputs.forEach(inp=>{
      const val = Math.max(0, Math.min(parseInt(inp.value)||0, parseInt(inp.dataset.pending)));
      // cumulative received = existing + newly entered — fetch existing from the row text is fragile,
      // so we recompute server-side using the delta approach: pass new cumulative via lookup
      lines.push({ rental_item_id: inp.dataset.line, add_qty: val });
    });
    // fetch current received_qty to compute new cumulative total
    const full = await fetchRentalFull(currentDetailId);
    const p_lines = lines.map(l=>{
      const line = full.lines.find(x=>x.id===l.rental_item_id);
      return { rental_item_id: l.rental_item_id, received_qty: (line?line.received_qty:0) + l.add_qty };
    }).filter(l=>l !== null);
    const { error } = await sb.rpc('record_return', { p_rental_id: currentDetailId, p_lines });
    if(error) throw error;
    toast('Return recorded');
    nav('return-summary');
  }catch(e){ alert(e.message); btn.disabled=false; btn.textContent=t('confirm_return'); }
}
async function renderReturnSummary(){
  const el = document.getElementById('returnSummaryContent');
  showLoading();
  let full;
  try{ full = await fetchRentalFull(currentDetailId); }
  catch(e){ el.innerHTML = `<div class="alert danger">${e.message}</div>`; hideLoading(); return; }
  hideLoading();
  const { rental:r, lines } = full;
  const received = lines.filter(l=>l.received_qty>0);
  const pending = lines.filter(l=>l.qty>l.received_qty);
  el.innerHTML = `
    <div class="alert ${pending.length===0?'info':'warn'}" style="font-size:15px; font-weight:800;">
      ${pending.length===0 ? '✅ ' + t('all_items_received') : '⏳ ' + t('partially_returned')}
    </div>
    <div class="section-label">${t('received')}</div>
    <div class="card">
      ${received.length===0?'<p style="color:var(--muted); font-size:13px;">—</p>':received.map(l=>`<div class="line" style="display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid var(--line);"><span>${escapeHtml(l.item_name)}</span><span class="num" style="font-weight:700;">${l.received_qty}</span></div>`).join('')}
    </div>
    ${pending.length>0?`
    <div class="section-label">${t('pending')}</div>
    <div class="card">
      ${pending.map(l=>`<div class="line" style="display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid var(--line);"><span>${escapeHtml(l.item_name)}</span><span class="num" style="font-weight:700; color:var(--warning);">${l.qty-l.received_qty}</span></div>`).join('')}
    </div>
    <button class="btn btn-whatsapp btn-block" style="margin-bottom:10px;" onclick="sharePendingWhatsapp('${r.id}')">💬 ${t('share_pending_whatsapp')}</button>
    `:''}
    <button class="btn btn-outline btn-block" onclick="openDetail('${r.id}')">${t('bill_no')} #${escapeHtml(r.bill_no)}</button>
  `;
}
async function sharePendingWhatsapp(rentalId){
  const full = await fetchRentalFull(rentalId);
  const pending = full.lines.filter(l=>l.qty>l.received_qty);
  const msg = `${t('app_name')}\nBill No: ${full.rental.bill_no}\n\n${t('pending')}:\n` +
    pending.map(l=>`${l.item_name} - ${l.qty-l.received_qty}`).join('\n');
  window.open(waLink(full.rental.mobile, msg), '_blank');
}

/* ---------------- Payments ---------------- */
function openPaymentForm(rentalId, balance){
  const html = `
    <div class="modal-header"><h3>${t('record_payment')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="field"><label>${t('balance')}: ${money(balance)}</label>
      <input type="number" id="payAmountInput" min="1" max="${balance}" placeholder="Amount received">
    </div>
    <div class="field"><label>${t('notes')}</label><input type="text" id="payNoteInput" placeholder="Optional"></div>
    <button class="btn btn-brass btn-block" id="savePaymentBtn" onclick="savePayment('${rentalId}', ${balance})">${t('record_payment')}</button>
  `;
  openModal(html);
}
async function savePayment(rentalId, balance){
  const amount = parseFloat(document.getElementById('payAmountInput').value);
  const note = document.getElementById('payNoteInput').value.trim();
  if(isNaN(amount) || amount<=0){ toast('Enter a valid amount'); return; }
  if(amount>balance){ toast('Amount exceeds balance due'); return; }
  const btn = document.getElementById('savePaymentBtn');
  btn.disabled = true; btn.textContent = t('saving');
  try{
    const { error } = await sb.rpc('record_payment', { p_rental_id: rentalId, p_amount: amount, p_note: note||null });
    if(error) throw error;
    closeModal();
    toast('Payment recorded');
    renderDetail();
  }catch(e){ alert(e.message); btn.disabled=false; btn.textContent=t('record_payment'); }
}

/* =========================================================
   HISTORY
========================================================= */
function renderHistoryChips(){
  const chips = [['ALL','all'],['ACTIVE','active_lbl'],['PARTIALLY_RETURNED','partial'],['COMPLETED','completed']];
  document.getElementById('historyStatusChips').innerHTML = chips.map(([v,k])=>
    `<button class="${historyStatusFilter===v?'active':''}" onclick="setHistoryFilter('${v}')">${t(k)}</button>`
  ).join('');
}
function setHistoryFilter(v){ historyStatusFilter = v; renderHistory(); }
async function renderHistory(){
  renderHistoryChips();
  showLoading();
  const el = document.getElementById('historyList');
  try{
    let query = sb.from('rentals').select('*, rental_items(qty, received_qty)').order('rental_date',{ascending:false}).limit(300);
    if(historyStatusFilter!=='ALL') query = query.eq('rental_status', historyStatusFilter);
    const { data, error } = await query;
    if(error) throw error;
    let list = data||[];
    const q = (document.getElementById('historySearch').value||'').toLowerCase();
    const dateFilter = document.getElementById('historyDateFilter').value;
    if(q) list = list.filter(r=> r.customer_name.toLowerCase().includes(q) || r.mobile.includes(q) || r.bill_no.toLowerCase().includes(q));
    if(dateFilter) list = list.filter(r=> r.rental_date.slice(0,10)===dateFilter);
    if(list.length===0){ el.innerHTML = emptyState('📜','No records found','Try a different search or filter'); hideLoading(); return; }
    el.innerHTML = list.map(r=>renderRentalCard(r)).join('');
  }catch(e){ el.innerHTML = `<div class="alert danger">${e.message}</div>`; }
  hideLoading();
}

/* =========================================================
   REPORTS
========================================================= */
function renderReportChips(){
  const chips = [['today','today'],['week','this_week'],['month','this_month'],['all','all']];
  document.getElementById('reportRangeChips').innerHTML = chips.map(([v,k])=>
    `<button class="${reportRange===v?'active':''}" onclick="setReportRange('${v}')">${t(k)}</button>`
  ).join('');
}
function setReportRange(v){ reportRange=v; renderReports(); }
function rangeStart(range){
  const now = new Date();
  if(range==='today'){ const d=new Date(); d.setHours(0,0,0,0); return d; }
  if(range==='week'){ const d=new Date(); d.setDate(d.getDate()-7); return d; }
  if(range==='month'){ const d=new Date(now.getFullYear(), now.getMonth(), 1); return d; }
  return null;
}
async function renderReports(){
  renderReportChips();
  showLoading();
  const el = document.getElementById('reportsContent');
  try{
    let query = sb.from('rentals').select('*, rental_items(item_name, qty)');
    const start = rangeStart(reportRange);
    if(start) query = query.gte('rental_date', start.toISOString());
    const { data, error } = await query;
    if(error) throw error;
    const rentals = data||[];
    const totalAmount = rentals.reduce((s,r)=>s+r.total_amount,0);
    const totalReceived = rentals.reduce((s,r)=>s+r.amount_received,0);
    const totalOutstanding = totalAmount-totalReceived;
    const activeCount = rentals.filter(r=>r.rental_status!=='COMPLETED').length;
    const completedCount = rentals.filter(r=>r.rental_status==='COMPLETED').length;
    const pendingItems = rentals.reduce((s,r)=> s + (r.rental_status!=='COMPLETED' ? 0 : 0), 0); // placeholder, recomputed below
    let pendingItemsCount = 0;
    const itemCounts = {};
    rentals.forEach(r=>{ (r.rental_items||[]).forEach(li=>{ itemCounts[li.item_name]=(itemCounts[li.item_name]||0)+li.qty; }); });
    const topItems = Object.entries(itemCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);

    const payCounts = { PAID:0, PARTIALLY_PAID:0, PENDING:0 };
    const statusCounts = { ACTIVE:0, PARTIALLY_RETURNED:0, COMPLETED:0 };
    rentals.forEach(r=>{ payCounts[r.payment_status]++; statusCounts[r.rental_status]++; });

    el.innerHTML = `
      <div class="stat-row">
        <div class="stat"><div class="n num">${rentals.length}</div><div class="l">Total Rentals</div></div>
        <div class="stat success"><div class="n num">${money(totalReceived)}</div><div class="l">Amount Received</div></div>
      </div>
      <div class="stat-row">
        <div class="stat warn"><div class="n num">${money(totalOutstanding)}</div><div class="l">Outstanding</div></div>
        <div class="stat"><div class="n num">${money(totalAmount)}</div><div class="l">Total Rental Amount</div></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="n num">${activeCount}</div><div class="l">Active/Partial</div></div>
        <div class="stat success"><div class="n num">${completedCount}</div><div class="l">Completed</div></div>
      </div>

      <div class="section-label">Payment Status</div>
      <div class="chart-box"><canvas id="payChart"></canvas></div>

      <div class="section-label">Rental Status</div>
      <div class="chart-box"><canvas id="statusChart"></canvas></div>

      <div class="section-label">Most Rented Items</div>
      <div class="card">
        ${topItems.length===0?'<p style="color:var(--muted); font-size:13px;">No rentals in this range</p>':
          topItems.map(([name,qty])=>`<div class="report-row"><span class="l">${escapeHtml(name)}</span><span class="v num">${qty} units</span></div>`).join('')}
      </div>
    `;
    if(reportsChartPayments) reportsChartPayments.destroy();
    if(reportsChartRentals) reportsChartRentals.destroy();
    reportsChartPayments = new Chart(document.getElementById('payChart'), {
      type:'doughnut',
      data:{ labels:[t('paid'),t('partially_paid'),t('pending')], datasets:[{ data:[payCounts.PAID,payCounts.PARTIALLY_PAID,payCounts.PENDING], backgroundColor:['#2F9E58','#C97A0D','#C7433F'] }] },
      options:{ plugins:{ legend:{ position:'bottom', labels:{ boxWidth:12, font:{size:11} } } } }
    });
    reportsChartRentals = new Chart(document.getElementById('statusChart'), {
      type:'doughnut',
      data:{ labels:[t('active_lbl'),t('partial'),t('completed')], datasets:[{ data:[statusCounts.ACTIVE,statusCounts.PARTIALLY_RETURNED,statusCounts.COMPLETED], backgroundColor:['#C97A0D','#B8873B','#2F9E58'] }] },
      options:{ plugins:{ legend:{ position:'bottom', labels:{ boxWidth:12, font:{size:11} } } } }
    });
  }catch(e){ el.innerHTML = `<div class="alert danger">${e.message}</div>`; }
  hideLoading();
}

/* =========================================================
   USERS (admin)
========================================================= */
async function renderUsers(){
  if(currentProfile.role!=='admin'){ document.getElementById('usersList').innerHTML = emptyState('🔒','Admin only','Ask your Admin for access'); return; }
  showLoading();
  try{
    const { data, error } = await sb.from('profiles').select('*').order('created_at');
    if(error) throw error;
    document.getElementById('usersList').innerHTML = (data||[]).map(u=>`
      <div class="user-row">
        <div>
          <div class="nm">${escapeHtml(u.full_name)} ${u.id===currentUser.id?'(you)':''}</div>
          <div class="meta">${u.role==='admin'?t('admin'):t('staff')} • ${u.active?'Active':'Inactive'}</div>
        </div>
        ${u.id!==currentUser.id ? `<button class="btn btn-sm ${u.active?'btn-danger-outline':'btn-outline'}" onclick="toggleUserActive('${u.id}', ${!u.active})">${u.active?t('deactivate'):t('activate')}</button>` : ''}
      </div>
    `).join('') || emptyState('👤','No users yet','');
  }catch(e){ document.getElementById('usersList').innerHTML = `<div class="alert danger">${e.message}</div>`; }
  hideLoading();
}
async function toggleUserActive(userId, makeActive){
  showLoading();
  try{
    const { error } = await sb.from('profiles').update({ active: makeActive }).eq('id', userId);
    if(error) throw error;
    toast('Updated');
    await renderUsers();
  }catch(e){ alert(e.message); }
  hideLoading();
}
function openUserForm(){
  const html = `
    <div class="modal-header"><h3>${t('add_user')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="field"><label>${t('full_name')} *</label><input type="text" id="newUserName"></div>
    <div class="field"><label>${t('email')} *</label><input type="email" id="newUserEmail"></div>
    <div class="field"><label>${t('password')} *</label><input type="password" id="newUserPassword" placeholder="Min 6 characters"></div>
    <div class="field"><label>${t('role')}</label>
      <select id="newUserRole"><option value="staff">${t('staff')}</option><option value="admin">${t('admin')}</option></select>
    </div>
    <div id="newUserError" style="color:var(--danger); font-size:12.5px; font-weight:600; margin-bottom:10px; display:none;"></div>
    <button class="btn btn-brass btn-block" id="createUserBtn" onclick="createUser()">${t('add_user')}</button>
  `;
  openModal(html);
}
async function createUser(){
  const full_name = document.getElementById('newUserName').value.trim();
  const email = document.getElementById('newUserEmail').value.trim();
  const password = document.getElementById('newUserPassword').value;
  const role = document.getElementById('newUserRole').value;
  const errEl = document.getElementById('newUserError');
  errEl.style.display='none';
  if(!full_name || !email || !password){ errEl.textContent='Please fill all required fields'; errEl.style.display='block'; return; }
  if(password.length<6){ errEl.textContent='Password must be at least 6 characters'; errEl.style.display='block'; return; }
  const btn = document.getElementById('createUserBtn');
  btn.disabled=true; btn.textContent=t('saving');
  try{
    const { data:{ session } } = await sb.auth.getSession();
    const resp = await fetch(`${SUPABASE_URL}/functions/v1/create-user`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${session.access_token}`, 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password, full_name, role })
    });
    const result = await resp.json();
    if(!result.success) throw new Error(result.error || 'Could not create user');
    closeModal();
    toast('User created');
    renderUsers();
  }catch(e){ errEl.textContent = e.message; errEl.style.display='block'; btn.disabled=false; btn.textContent=t('add_user'); }
}

/* =========================================================
   SETTINGS
========================================================= */
async function renderSettings(){
  const qrUploadBtn = document.querySelector('#screen-settings .card button[onclick*="qrFileInput"]');
  if(qrUploadBtn) qrUploadBtn.style.display = (currentProfile && currentProfile.role==='admin') ? 'flex' : 'none';
  showLoading();
  try{
    const { data, error } = await sb.from('shop_settings').select('*').eq('id',1).single();
    if(error) throw error;
    const img = document.getElementById('qrPreviewImg');
    if(data && data.qr_image_url){ img.src = data.qr_image_url; img.style.display='block'; } else { img.style.display='none'; }
  }catch(e){ toast(e.message); }
  hideLoading();
}
async function handleQrUpload(e){
  const file = e.target.files[0];
  if(!file) return;
  showLoading();
  try{
    const blob = await resizeImageFile(file, 500);
    const path = `qr_${Date.now()}.jpg`;
    const { error: upErr } = await sb.storage.from('shop-assets').upload(path, blob, { contentType:'image/jpeg', upsert:true });
    if(upErr) throw upErr;
    const { data: pub } = sb.storage.from('shop-assets').getPublicUrl(path);
    const { error } = await sb.from('shop_settings').update({ qr_image_url: pub.publicUrl }).eq('id',1);
    if(error) throw error;
    toast('QR code saved');
    renderSettings();
  }catch(e){ alert(e.message); }
  hideLoading();
}
function csvEscape(v){ v=String(v==null?'':v); if(/[",\n]/.test(v)) v='"'+v.replace(/"/g,'""')+'"'; return v; }
function downloadCsv(filename, rows){
  const content = rows.map(row=>row.map(csvEscape).join(',')).join('\n');
  const blob = new Blob([content], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
async function exportHistoryCsv(){
  showLoading();
  try{
    const { data, error } = await sb.from('rentals').select('*, rental_items(item_name, qty, price)').order('rental_date',{ascending:false}).limit(1000);
    if(error) throw error;
    const rows = [['Bill No','Customer','Mobile','Rental Date','Rental Status','Payment Status','Total','Received','Balance','Items']];
    (data||[]).forEach(r=>{
      rows.push([r.bill_no, r.customer_name, r.mobile, fmtDateTime(r.rental_date), r.rental_status, r.payment_status, r.total_amount, r.amount_received, r.total_amount-r.amount_received, r.rental_items.map(l=>`${l.item_name} x${l.qty}`).join('; ')]);
    });
    downloadCsv('kpm-store-rental-history.csv', rows);
    toast('CSV downloaded');
  }catch(e){ alert(e.message); }
  hideLoading();
}
async function exportItemsCsv(){
  showLoading();
  try{
    await loadItemsAndStock(true);
    const rows = [['Item','Tamil Name','Total Qty','Currently Rented','Available','Price','Active']];
    ITEMS_CACHE.forEach(item=> rows.push([item.name, item.name_ta||'', item.total_qty, OUTSTANDING_CACHE[item.id]||0, availableQty(item), item.price, item.active?'Yes':'No']));
    downloadCsv('kpm-store-items-report.csv', rows);
    toast('CSV downloaded');
  }catch(e){ alert(e.message); }
  hideLoading();
}

/* =========================================================
   MODAL
========================================================= */
function openModal(html, center=false){
  document.getElementById('modalRoot').innerHTML = `<div class="modal-backdrop ${center?'center':''}" onclick="if(event.target===this)closeModal()"><div class="modal-sheet">${html}</div></div>`;
}
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; }

/* =========================================================
   INIT
========================================================= */
updateOnlineStatus();
applyStaticI18n();
initAuth();
