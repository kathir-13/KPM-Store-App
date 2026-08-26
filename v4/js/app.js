
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
   KPM FRONTEND V2 OVERRIDES
   Requires database upgrade KPM_02_upgrade_v2.sql
========================================================= */

SCREENS.push('return-rentals','return-detail','edit-rentals','edit-rental-detail');
let activeStatusFilter = 'ALL';
let returnStatusFilter = 'ALL';
let newRentalDraft = {name:'',mobile:'',address:'',notes:''};
let editingRentalFull = null;
let editRentalSelections = {};
let SHOP_SETTINGS_CACHE = null;

Object.assign(I18N.en, {
  history:'All Transactions', all_transactions:'All Transactions', show_bill:'Show Bill', rental_items:'Rental Items',
  mobile_optional:'Mobile Number (Optional)', active_rental_edit:'Active Rental Edit', pending_transactions:'Pending Transactions',
  active_transactions:'Active Transactions', discount:'Discount Amount', final_amount:'Final Amount', print_bill:'Print Bill',
  edit_user:'Edit User', delete_user:'Delete User', english_name:'English Name (Optional)', tamil_name:'Tamil Name',
  pending_count:'Pending Count', all_received:'All Received', updated_bill:'Updated Bill', save_updated_bill:'Save & Show Updated Bill'
});
Object.assign(I18N.ta, {
  history:'அனைத்து பரிவர்த்தனைகள்', all_transactions:'அனைத்து பரிவர்த்தனைகள்', show_bill:'பில் காட்டு', rental_items:'வாடகை பொருட்கள்',
  mobile_optional:'மொபைல் எண் (விருப்பம்)', active_rental_edit:'நடப்பு வாடகை திருத்தம்', pending_transactions:'நிலுவை பரிவர்த்தனைகள்',
  active_transactions:'நடப்பு பரிவர்த்தனைகள்', discount:'தள்ளுபடி தொகை', final_amount:'இறுதி தொகை', print_bill:'பில் அச்சிடு',
  edit_user:'பயனர் திருத்தம்', delete_user:'பயனர் நீக்கு', english_name:'ஆங்கில பெயர் (விருப்பம்)', tamil_name:'தமிழ் பெயர்',
  pending_count:'நிலுவை எண்ணிக்கை', all_received:'அனைத்தும் பெறப்பட்டது', updated_bill:'புதுப்பித்த பில்', save_updated_bill:'சேமித்து பில் காட்டு'
});

function applyStaticI18n(){
  document.getElementById('langEnBtn').classList.toggle('active', currentLang==='en');
  document.getElementById('langTaBtn').classList.toggle('active', currentLang==='ta');
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent=t(el.getAttribute('data-i18n')); });
  const setText=(id,val)=>{const el=document.getElementById(id); if(el) el.textContent=val;};
  setText('dashShopName','KPM'); setText('loginTitleShop','KPM'); setText('lblEmail',t('email')); setText('lblPassword',t('password'));
  setText('loginBtn',t('login_btn')); setText('allItemsLabel',t('all_items')); setText('step1Label',t('step1_select'));
  setText('step2Label',t('step2_customer')); setText('lblCustName',t('customer_name')+' *'); setText('lblMobile',t('mobile_optional'));
  setText('lblAddress',t('address')); setText('lblNotes',t('notes')); setText('estAmtLbl',t('total_amount_lbl'));
  setText('reviewBtn',t('show_bill')); setText('qrLabel',t('qr_code')); setText('uploadQrLbl',t('upload_qr')); setText('logoutLbl2',t('logout'));
  const addBtn=document.getElementById('addItemBtn'); if(addBtn) addBtn.innerHTML='➕ '+t('add_new_item');
}

function validMobile(m){
  const d=(m||'').replace(/\D/g,'');
  return d==='' || /^[6-9]\d{9}$/.test(d);
}

function nav(screen,push=true){
  if(!currentUser && screen!=='login') return;
  SCREENS.forEach(s=>{const el=document.getElementById('screen-'+s); if(el) el.classList.toggle('active',s===screen);});
  const titleMap={
    dashboard:'KPM', items:t('manage_items'), 'new-rental':t('new_rental'), review:t('show_bill'), active:t('active_rentals'),
    detail:t('bill_no'), 'return-rentals':t('return_items'), 'return-detail':t('return_items'), 'return-summary':t('return_items'),
    'edit-rentals':t('active_rental_edit'), 'edit-rental-detail':t('active_rental_edit'), history:t('all_transactions'),
    reports:t('reports'), users:t('user_management'), settings:t('settings')
  };
  document.getElementById('screenTitle').textContent=titleMap[screen]||'KPM';
  document.querySelectorAll('#bottomnav button').forEach(b=>b.classList.toggle('active',b.dataset.s===screen));
  document.getElementById('backBtn').style.visibility=NAV_SCREENS.includes(screen)?'hidden':'visible';
  if(push && navStack[navStack.length-1]!==screen) navStack.push(screen);
  currentScreen=screen; renderScreen(screen); window.scrollTo(0,0);
}

function renderScreen(screen){
  if(screen==='dashboard') renderDashboard();
  else if(screen==='items') renderItems();
  else if(screen==='new-rental') renderNewRentalScreen();
  else if(screen==='review') renderReviewScreen();
  else if(screen==='active') renderActive();
  else if(screen==='detail') renderDetail();
  else if(screen==='return-rentals') renderReturnRentals();
  else if(screen==='return-detail') renderReturnDetail();
  else if(screen==='return-summary') renderReturnSummary();
  else if(screen==='edit-rentals') renderEditRentals();
  else if(screen==='edit-rental-detail') renderEditRentalDetail();
  else if(screen==='history') renderHistory();
  else if(screen==='reports') renderReports();
  else if(screen==='users') renderUsers();
  else if(screen==='settings') renderSettings();
}

async function getShopSettings(force=false){
  if(SHOP_SETTINGS_CACHE && !force) return SHOP_SETTINGS_CACHE;
  const {data,error}=await sb.from('shop_settings').select('*').eq('id',1).single();
  if(error) throw error;
  SHOP_SETTINGS_CACHE=data||{}; return SHOP_SETTINGS_CACHE;
}

/* ---------------- Dashboard V2 ---------------- */
async function renderDashboard(){
  document.getElementById('dashTiles').innerHTML=`
    <button class="tile primary" onclick="startNewRental()"><span class="ic">➕</span><span class="lbl">${t('new_rental')}</span></button>
    <button class="tile" onclick="nav('active')"><span class="ic">📦</span><span class="lbl">${t('active_rentals')}</span></button>
    <button class="tile" onclick="nav('return-rentals')"><span class="ic">↩️</span><span class="lbl">${t('return_items')}</span></button>
    <button class="tile" onclick="nav('edit-rentals')"><span class="ic">✏️</span><span class="lbl">${t('active_rental_edit')}</span></button>
    <button class="tile" onclick="nav('items')"><span class="ic">🍽️</span><span class="lbl">${t('manage_items')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">💰</span><span class="lbl">${t('payments')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">🧾</span><span class="lbl">${t('all_transactions')}</span></button>
    <button class="tile" onclick="nav('reports')"><span class="ic">📊</span><span class="lbl">${t('reports')}</span></button>
    ${currentProfile.role==='admin'?`<button class="tile" onclick="nav('users')"><span class="ic">👤</span><span class="lbl">${t('user_management')}</span></button>`:''}
    <button class="tile" onclick="nav('settings')"><span class="ic">⚙️</span><span class="lbl">${t('settings')}</span></button>`;
  showLoading();
  try{
    const {data,error}=await sb.from('rentals').select('id,rental_status,final_amount,amount_received,rental_items(qty,received_qty)');
    if(error) throw error;
    const rows=data||[];
    const activeCount=rows.filter(r=>r.rental_status==='ACTIVE').length;
    const pendingTxnCount=rows.filter(r=>r.rental_status==='PARTIALLY_RETURNED').length;
    const pendingItemCount=rows.filter(r=>r.rental_status!=='COMPLETED').reduce((s,r)=>s+(r.rental_items||[]).reduce((x,l)=>x+Math.max(0,l.qty-l.received_qty),0),0);
    const outstanding=rows.reduce((s,r)=>s+Math.max(0,Number(r.final_amount||0)-Number(r.amount_received||0)),0);
    document.getElementById('dashAlerts').innerHTML='';
    document.getElementById('dashStats').innerHTML=`
      <div class="stat"><div class="n num">${activeCount}</div><div class="l">${t('active_transactions')}</div></div>
      <div class="stat warn"><div class="n num">${pendingTxnCount}</div><div class="l">${t('pending_transactions')}</div></div>
      <div class="stat"><div class="n num">${pendingItemCount}</div><div class="l">Pending Item Qty</div></div>
      <div class="stat danger"><div class="n num">${money(outstanding)}</div><div class="l">Outstanding Payment</div></div>`;
  }catch(e){document.getElementById('dashStats').innerHTML=`<div class="alert danger" style="grid-column:1/-1">${escapeHtml(e.message)}</div>`;}
  hideLoading();
}

/* ---------------- Items V2 ---------------- */
async function renderItems(){
  const isAdmin=currentProfile?.role==='admin';
  const addBtn=document.getElementById('addItemBtn'); if(addBtn) addBtn.style.display=isAdmin?'flex':'none';
  showLoading();
  try{await loadItemsAndStock(true);}catch(e){toast(e.message);hideLoading();return;}
  hideLoading();
  const list=document.getElementById('itemsList');
  if(!ITEMS_CACHE.length){list.innerHTML=emptyState('🍽️','No items yet','Add your first rental item');return;}
  list.innerHTML=ITEMS_CACHE.map(item=>{
    const rented=OUTSTANDING_CACHE[item.id]||0, avail=availableQty(item);
    const thumb=item.photo_url?`<img src="${item.photo_url}">`:'🍽️';
    return `<div class="item-card"><div class="item-thumb">${thumb}</div><div class="item-info">
      <div class="nm">${escapeHtml(item.name)}</div>${item.name_en?`<div class="nmta">${escapeHtml(item.name_en)}</div>`:''}
      <div class="sub">Rate: ${money(item.price)} / unit</div><div class="stockline"><span class="tot">Total ${item.total_qty}</span>
      ${item.active?`<span class="${avail<=0?'zero':'avail'}">Available ${avail}</span>`:`<span class="inactive">Inactive</span>`}
      ${rented?`<span class="rented">Rented ${rented}</span>`:''}</div></div>
      ${isAdmin?`<div style="display:flex;flex-direction:column;gap:7px"><button class="btn btn-outline btn-sm" onclick="openItemForm('${item.id}')">${t('edit')}</button><button class="btn ${item.active?'btn-danger-outline':'btn-outline'} btn-sm" onclick="toggleItemActive('${item.id}',${!item.active})">${item.active?t('deactivate'):t('activate')}</button></div>`:''}
    </div>`;
  }).join('');
}

function openItemForm(itemId){
  editingItemId=itemId||null; const item=itemId?ITEMS_CACHE.find(i=>i.id===itemId):null; pendingItemPhotoFile=null;
  openModal(`<div class="modal-header"><h3>${item?t('edit'):t('add_new_item')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="photo-upload" id="itemPhotoUpload" onclick="document.getElementById('itemPhotoInput').click()">${item?.photo_url?`<img src="${item.photo_url}">`:`<span style="font-size:28px">📷</span><span class="lbl">Take / Upload Photo</span>`}</div>
    <input type="file" accept="image/*" capture="environment" id="itemPhotoInput" style="display:none" onchange="handleItemPhotoSelect(event)">
    <div class="field"><label>${t('tamil_name')} *</label><input type="text" id="itemNameInput" value="${item?escapeHtml(item.name):''}" placeholder="தமிழ் பெயர்"></div>
    <div class="field"><label>${t('english_name')}</label><input type="text" id="itemNameEnInput" value="${item?.name_en?escapeHtml(item.name_en):''}" placeholder="English name"></div>
    <div class="row2"><div class="field"><label>${t('total_qty')} *</label><input type="number" id="itemQtyInput" min="0" value="${item?item.total_qty:''}"></div>
    <div class="field"><label>${t('price')} *</label><input type="number" id="itemPriceInput" min="0" step="0.01" value="${item?item.price:''}"></div></div>
    <button class="btn btn-brass btn-block" id="saveItemBtn" onclick="saveItemForm()">${t('save_item')}</button>`);
}

async function saveItemForm(){
  const name=document.getElementById('itemNameInput').value.trim(), nameEn=document.getElementById('itemNameEnInput').value.trim();
  const qty=parseInt(document.getElementById('itemQtyInput').value), price=parseFloat(document.getElementById('itemPriceInput').value);
  if(!name){toast('Enter Tamil item name');return;} if(!Number.isInteger(qty)||qty<0){toast('Enter valid quantity');return;} if(isNaN(price)||price<0){toast('Enter valid rate');return;}
  const btn=document.getElementById('saveItemBtn'); btn.disabled=true; btn.textContent=t('saving');
  try{
    let photoUrl=editingItemId?(ITEMS_CACHE.find(i=>i.id===editingItemId)||{}).photo_url:null;
    if(pendingItemPhotoFile){const blob=await resizeImageFile(pendingItemPhotoFile,600);const path=`${Date.now()}_${uid()}.jpg`;const {error:upErr}=await sb.storage.from('item-photos').upload(path,blob,{contentType:'image/jpeg'});if(upErr)throw upErr;const {data:pub}=sb.storage.from('item-photos').getPublicUrl(path);photoUrl=pub.publicUrl;}
    const payload={name,name_en:nameEn||null,total_qty:qty,price,photo_url:photoUrl};
    const {error}=editingItemId?await sb.from('items').update(payload).eq('id',editingItemId):await sb.from('items').insert({...payload,active:true});
    if(error)throw error; closeModal(); toast(editingItemId?'Item updated':'Item added'); await renderItems();
  }catch(e){alert(e.message);btn.disabled=false;btn.textContent=t('save_item');}
}

/* ---------------- New Rental V2 ---------------- */
function startNewRental(){newRentalSelections={};reviewData=null;newRentalDraft={name:'',mobile:'',address:'',notes:''};nav('new-rental');}
async function renderNewRentalScreen(){
  showLoading(); try{await loadItemsAndStock(false);}catch(e){toast(e.message);} hideLoading();
  const source=reviewData||newRentalDraft;
  document.getElementById('nrName').value=source.name||''; document.getElementById('nrMobile').value=source.mobile||'';
  document.getElementById('nrAddress').value=source.address||''; document.getElementById('nrNotes').value=source.notes||'';
  renderPickItems(); updateNewRentalTotal();
}

function renderPickItems(){
  const list=document.getElementById('pickItemsList'); if(!ITEMS_CACHE.length){list.innerHTML=emptyState('🍽️','No items available','Add items first');return;}
  list.innerHTML=ITEMS_CACHE.map(item=>{const avail=availableQty(item),qty=newRentalSelections[item.id]||0,thumb=item.photo_url?`<img src="${item.photo_url}">`:'🍽️';
    return `<div class="pick-card ${qty>0?'selected':''}"><div class="pick-top"><div class="item-thumb">${thumb}</div><div class="item-info"><div class="nm">${escapeHtml(item.name)}</div>${item.name_en?`<div class="nmta">${escapeHtml(item.name_en)}</div>`:''}<div class="price">Rate ${money(item.price)}</div><div class="avail-tag ${avail<=0?'low':''}">Available: ${avail}</div></div></div>
    <div class="pick-bottom"><div class="stepper"><button onclick="adjustPick('${item.id}',-1)" ${qty<=0?'disabled':''}>−</button><input class="qty-direct num" type="number" inputmode="numeric" min="0" max="${avail}" value="${qty}" onchange="setPickQty('${item.id}',this.value)"><button onclick="adjustPick('${item.id}',1)" ${qty>=avail?'disabled':''}>+</button></div><span class="lineamt num">${money(qty*item.price)}</span></div></div>`;}).join('');
}
function setPickQty(itemId,value){const item=ITEMS_CACHE.find(i=>i.id===itemId);if(!item)return;const avail=availableQty(item);let qty=parseInt(value)||0;qty=Math.max(0,Math.min(qty,avail));newRentalSelections[itemId]=qty;renderPickItems();updateNewRentalTotal();}
function adjustPick(itemId,delta){setPickQty(itemId,(newRentalSelections[itemId]||0)+delta);}
function updateNewRentalTotal(){let lines=0,total=0;for(const id in newRentalSelections){const q=newRentalSelections[id]||0;if(q>0){const it=ITEMS_CACHE.find(x=>x.id===id);if(it){lines++;total+=q*Number(it.price);}}}document.querySelector('#nrTotalBox .val').textContent=money(total);document.getElementById('estAmtSub').textContent=lines?`${lines} product(s) selected`:'Select items to see total';}
function goToReview(){
  const name=document.getElementById('nrName').value.trim(),mobile=document.getElementById('nrMobile').value.trim(),address=document.getElementById('nrAddress').value.trim(),notes=document.getElementById('nrNotes').value.trim();
  newRentalDraft={name,mobile,address,notes}; const selected=Object.keys(newRentalSelections).filter(id=>(newRentalSelections[id]||0)>0);
  if(!selected.length){toast('Please select at least one item');return;} if(!name){toast('Please enter customer name');return;} if(!validMobile(mobile)){toast('Mobile must be a valid 10-digit number or left blank');return;}
  const lines=selected.map(id=>{const item=ITEMS_CACHE.find(i=>i.id===id);return{item_id:id,item_name:item.name,price:Number(item.price),qty:newRentalSelections[id]};});
  reviewData={...newRentalDraft,lines,total:lines.reduce((s,l)=>s+l.qty*l.price,0)}; nav('review');
}
function renderReviewScreen(){
  if(!reviewData){nav('new-rental',false);return;} const el=document.getElementById('reviewContent');
  el.innerHTML=`<div class="card"><div class="section-label" style="margin-top:0">${t('customer_name')}</div><div class="customer-highlight">${escapeHtml(reviewData.name)}</div><div class="customer-sub">${reviewData.mobile?escapeHtml(reviewData.mobile):'Mobile not provided'}${reviewData.address?'<br>'+escapeHtml(reviewData.address):''}</div>${reviewData.notes?`<div class="customer-sub">${escapeHtml(reviewData.notes)}</div>`:''}</div>
  <div class="section-label">${t('rental_items')}</div><div class="card"><table class="bill-table"><thead><tr><th>${t('product')}</th><th class="num">${t('qty')}</th><th class="num">${t('amount')}</th></tr></thead><tbody>${reviewData.lines.map(l=>`<tr><td><b>${escapeHtml(l.item_name)}</b><br><small>${money(l.price)} × ${l.qty}</small></td><td class="num"><b>${l.qty}</b></td><td class="num"><b>${money(l.qty*l.price)}</b></td></tr>`).join('')}</tbody></table></div>
  <div class="total-box"><div class="lbl">${t('total_amount_lbl')}</div><div class="val num">${money(reviewData.total)}</div></div><div style="display:flex;gap:10px"><button class="btn btn-outline btn-block" onclick="nav('new-rental',false)">${t('back')}</button><button class="btn btn-brass btn-block" id="confirmRentalBtn" onclick="confirmRental()">${t('confirm_rental')}</button></div>`;
}
async function confirmRental(){
  const btn=document.getElementById('confirmRentalBtn');if(btn.disabled)return;btn.disabled=true;btn.textContent=t('saving');
  try{const {data,error}=await sb.rpc('create_rental',{p_customer_name:reviewData.name,p_mobile:reviewData.mobile||null,p_address:reviewData.address||null,p_notes:reviewData.notes||null,p_items:reviewData.lines.map(l=>({item_id:l.item_id,qty:l.qty}))});if(error)throw error;const row=Array.isArray(data)?data[0]:data;
    reviewData=null;newRentalSelections={};newRentalDraft={name:'',mobile:'',address:'',notes:''};currentDetailId=row.id;toast('Rental created — '+row.bill_no);navStack=['dashboard','active'];nav('detail');
  }catch(e){alert(e.message);btn.disabled=false;btn.textContent=t('confirm_rental');}
}

/* ---------------- Rental cards / Active filters ---------------- */
function statusFilterHtml(target,filter,setter){const values=[['ALL','All'],['ACTIVE',t('active_lbl')],['PARTIALLY_RETURNED',t('partial')]];document.getElementById(target).innerHTML=values.map(([v,l])=>`<button class="${filter===v?'active':''}" onclick="${setter}('${v}')">${l}</button>`).join('');}
function setActiveStatus(v){activeStatusFilter=v;renderActive();}
function renderRentalCard(r,onclick=`openDetail('${r.id}')`){const pending=rentalPendingCount(r);const final=Number(r.final_amount??r.total_amount??0);const bal=Math.max(0,final-Number(r.amount_received||0));return `<div class="rental-card" onclick="${onclick}"><div class="top-row"><div><div class="cust">${escapeHtml(r.customer_name)}</div><div class="phone">${r.mobile?escapeHtml(r.mobile):'No mobile'}</div></div><div class="badges"><span class="badge st-${r.rental_status}">${t(r.rental_status==='ACTIVE'?'active_lbl':r.rental_status==='PARTIALLY_RETURNED'?'partial':'completed')}</span><span class="badge pay-${r.payment_status}">${t(r.payment_status==='PENDING'?'pending':r.payment_status==='PARTIALLY_PAID'?'partially_paid':'paid')}</span></div></div><div class="meta">${escapeHtml(r.bill_no)} • ${fmtDateTime(r.rental_date)}</div><div class="bottom-row"><span>${pending} pending qty • Balance ${money(bal)}</span><span class="amt num">${money(final)}</span></div></div>`;}
async function renderActive(){
  statusFilterHtml('activeStatusChips',activeStatusFilter,'setActiveStatus');showLoading();const el=document.getElementById('activeList');
  try{let qy=sb.from('rentals').select('*,rental_items(qty,received_qty)').in('rental_status',['ACTIVE','PARTIALLY_RETURNED']).order('rental_date',{ascending:false});if(activeStatusFilter!=='ALL')qy=qy.eq('rental_status',activeStatusFilter);const {data,error}=await qy;if(error)throw error;let list=data||[];const q=(document.getElementById('activeSearch').value||'').toLowerCase(),d=document.getElementById('activeDateFilter').value;if(q)list=list.filter(r=>(r.customer_name||'').toLowerCase().includes(q)||(r.mobile||'').includes(q)||(r.bill_no||'').toLowerCase().includes(q));if(d)list=list.filter(r=>r.rental_date?.slice(0,10)===d);el.innerHTML=list.length?list.map(r=>renderRentalCard(r)).join(''):emptyState('📦','No matching active rentals','');}catch(e){el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}hideLoading();
}

/* ---------------- Bill / Payment V2 ---------------- */
function billBalance(r){return Math.max(0,Number(r.final_amount??r.total_amount??0)-Number(r.amount_received||0));}
function buildBillMessage(r,lines,s){const final=Number(r.final_amount??r.total_amount??0),discount=Number(r.discount_amount||0),bal=billBalance(r);return `KPM\n${s.owner_name||'K Ponnumani Murugesan'}\n${s.owner_mobile?'Mobile: '+s.owner_mobile+'\n':''}${s.address||''}\n\nBill No: ${r.bill_no}\nDate: ${fmtDateTime(r.rental_date)}\nCustomer: ${r.customer_name}${r.mobile?'\nMobile: '+r.mobile:''}\n\n${lines.map(l=>`${l.item_name} - ${l.qty} × ${money(l.price)} = ${money(l.qty*l.price)}`).join('\n')}\n\nTotal: ${money(r.total_amount)}\nDiscount: ${money(discount)}\nFinal Amount: ${money(final)}\nReceived: ${money(r.amount_received)}\nBalance: ${money(bal)}`;}
async function renderDetail(){
  const el=document.getElementById('detailContent');showLoading();try{const full=await fetchRentalFull(currentDetailId),s=await getShopSettings();hideLoading();const {rental:r,lines,pays}=full,bal=billBalance(r),final=Number(r.final_amount??r.total_amount??0);
    el.innerHTML=`<div class="card bill-card" id="billCard"><div class="bill-header"><div class="shop">KPM</div><div class="billno">${escapeHtml(r.bill_no)}</div></div><div class="store-detail" style="text-align:center"><b>${escapeHtml(s.owner_name||'K Ponnumani Murugesan')}</b><br>${escapeHtml(s.owner_mobile||'9940841872')}<br>${escapeHtml(s.address||'105, Arasamara Street, Panpoli - 627807')}</div><div class="divider"></div>
      <div class="customer-highlight">${escapeHtml(r.customer_name)}</div><div class="customer-sub">${r.mobile?escapeHtml(r.mobile)+'<br>':''}${r.address?escapeHtml(r.address)+'<br>':''}${fmtDateTime(r.rental_date)}</div><div class="divider"></div>
      <div class="section-label" style="margin-top:0">${t('rental_items')}</div><table class="bill-table"><thead><tr><th>${t('product')}</th><th class="num">Qty</th><th class="num">Amount</th></tr></thead><tbody>${lines.map(l=>`<tr><td><b>${escapeHtml(l.item_name)}</b><br><small>${money(l.price)} each</small></td><td class="num">${l.qty}</td><td class="num">${money(l.qty*l.price)}</td></tr>`).join('')}</tbody></table><div class="divider"></div>
      <div class="balance-box financial-total"><span class="l">Total Amount</span><span class="v num">${money(r.total_amount)}</span></div><div class="balance-box"><span class="l">${t('discount')}</span><span class="v num">− ${money(r.discount_amount||0)}</span></div><div class="balance-box financial-final"><span class="l">${t('final_amount')}</span><span class="v num">${money(final)}</span></div><div class="balance-box"><span class="l">Received Amount</span><span class="v num">${money(r.amount_received)}</span></div><div class="balance-box"><span class="l">Balance Amount</span><span class="v num" style="color:${bal?'var(--danger)':'var(--success)'}">${money(bal)}</span></div></div>
      <div class="bill-actions"><button class="btn btn-whatsapp" onclick="shareBillPdf('${r.id}')">💬 ${t('whatsapp_bill')}</button><button class="btn btn-outline" onclick="printBill('${r.id}')">🖨️ ${t('print_bill')}</button></div>
      <div class="section-label">${t('payments')}</div><div class="card"><div class="balance-box"><span class="l">Final Amount</span><span class="v">${money(final)}</span></div><div class="balance-box"><span class="l">Received</span><span class="v">${money(r.amount_received)}</span></div><div class="balance-box"><span class="l">Balance</span><span class="v">${money(bal)}</span></div></div>
      ${bal>0?`<button class="btn btn-brass btn-block" onclick="openPaymentForm('${r.id}',${bal})">💰 ${t('record_payment')}</button>`:''}
      <button class="btn btn-outline btn-block" style="margin-top:10px" onclick="openDiscountForm('${r.id}',${Number(r.total_amount)},${Number(r.discount_amount||0)})">🏷️ ${t('discount')}</button>
      ${pays.length?`<div class="section-label">${t('payment_history')}</div><div class="card">${pays.map(p=>`<div class="balance-box"><span class="l">${fmtDateTime(p.paid_at)}${p.note?' — '+escapeHtml(p.note):''}</span><span class="v">${money(p.amount)}</span></div>`).join('')}</div>`:''}`;
  }catch(e){hideLoading();el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}
}
function openDiscountForm(rentalId,total,current){openModal(`<div class="modal-header"><h3>${t('discount')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div><div class="field"><label>Total: ${money(total)}</label><input type="number" id="discountInput" min="0" max="${total}" value="${current}"></div><button class="btn btn-brass btn-block" id="saveDiscountBtn" onclick="saveDiscount('${rentalId}')">Save Discount</button>`);}
async function saveDiscount(id){const val=parseFloat(document.getElementById('discountInput').value)||0,btn=document.getElementById('saveDiscountBtn');btn.disabled=true;try{const {error}=await sb.rpc('set_rental_discount',{p_rental_id:id,p_discount:val});if(error)throw error;closeModal();toast('Discount updated');renderDetail();}catch(e){alert(e.message);btn.disabled=false;}}
async function savePayment(rentalId,balance){const amount=parseFloat(document.getElementById('payAmountInput').value),note=document.getElementById('payNoteInput').value.trim();if(isNaN(amount)||amount<=0){toast('Enter a valid amount');return;}if(amount>balance){toast('Amount exceeds balance');return;}const btn=document.getElementById('savePaymentBtn');btn.disabled=true;btn.textContent=t('saving');try{const {error}=await sb.rpc('record_payment',{p_rental_id:rentalId,p_amount:amount,p_note:note||null});if(error)throw error;closeModal();toast('Payment recorded');renderDetail();}catch(e){alert(e.message);btn.disabled=false;btn.textContent=t('record_payment');}}

function createBillPdfBlob(r,lines,s){
  if(!window.jspdf?.jsPDF) throw new Error('PDF library is not loaded'); const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'mm',format:'a5'}); const W=148; let y=12;
  doc.setDrawColor(70);doc.circle(130,15,8);doc.setFontSize(8);doc.text('AMMAN',130,16,{align:'center'});doc.setFontSize(20);doc.setFont(undefined,'bold');doc.text('KPM',W/2,y,{align:'center'});y+=8;doc.setFontSize(11);doc.text(s.owner_name||'K Ponnumani Murugesan',W/2,y,{align:'center'});y+=5;doc.setFont(undefined,'normal');doc.setFontSize(9);doc.text(`Mobile: ${s.owner_mobile||'9940841872'}`,W/2,y,{align:'center'});y+=4;doc.text(s.address||'105, Arasamara Street, Panpoli - 627807',W/2,y,{align:'center',maxWidth:120});y+=8;doc.line(10,y,W-10,y);y+=6;
  doc.setFontSize(10);doc.text(`Bill: ${r.bill_no}`,10,y);doc.text(fmtDateTime(r.rental_date),W-10,y,{align:'right'});y+=6;doc.setFont(undefined,'bold');doc.text(`Customer: ${r.customer_name}`,10,y);doc.setFont(undefined,'normal');y+=5;if(r.mobile){doc.text(`Mobile: ${r.mobile}`,10,y);y+=5;}if(r.address){doc.text(`Address: ${r.address}`,10,y,{maxWidth:125});y+=6;}doc.line(10,y,W-10,y);y+=6;
  doc.setFont(undefined,'bold');doc.text('Item',10,y);doc.text('Qty',98,y,{align:'right'});doc.text('Amount',138,y,{align:'right'});doc.setFont(undefined,'normal');y+=5;
  lines.forEach(l=>{if(y>180){doc.addPage();y=12;}doc.text(String(l.item_name).slice(0,36),10,y);doc.text(String(l.qty),98,y,{align:'right'});doc.text(`Rs ${Math.round(l.qty*l.price)}`,138,y,{align:'right'});y+=5;});
  y+=2;doc.line(10,y,W-10,y);y+=6;const final=Number(r.final_amount??r.total_amount),bal=billBalance(r);const rows=[['Total',r.total_amount],['Discount',-(r.discount_amount||0)],['Final Amount',final],['Received',r.amount_received],['Balance',bal]];rows.forEach(([label,val],idx)=>{if(idx===2)doc.setFont(undefined,'bold');doc.text(label,90,y,{align:'right'});doc.text(`Rs ${Math.round(val)}`,138,y,{align:'right'});if(idx===2)doc.setFont(undefined,'normal');y+=6;});y+=3;doc.setFontSize(8);doc.text('Thank you. Please keep this bill for rental reference.',W/2,y,{align:'center'});return doc.output('blob');
}
async function shareBillPdf(id){showLoading('Preparing PDF...');try{const full=await fetchRentalFull(id),s=await getShopSettings(),blob=createBillPdfBlob(full.rental,full.lines,s),file=new File([blob],`${full.rental.bill_no}.pdf`,{type:'application/pdf'}),msg=buildBillMessage(full.rental,full.lines,s);hideLoading();if(navigator.share&&navigator.canShare?.({files:[file]})){await navigator.share({title:`KPM ${full.rental.bill_no}`,text:msg,files:[file]});}else{const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);if(full.rental.mobile)window.open(waLink(full.rental.mobile,msg),'_blank');toast('PDF downloaded. Attach it in WhatsApp if file sharing is unavailable.');}}catch(e){hideLoading();alert(e.message);}}
async function printBill(id){try{const full=await fetchRentalFull(id),s=await getShopSettings(),r=full.rental,bal=billBalance(r),w=window.open('','_blank','width=700,height=900');w.document.write(`<!doctype html><html><head><title>${r.bill_no}</title><style>body{font-family:Arial,sans-serif;padding:24px;font-size:16px}h1{text-align:center;margin:0}.center{text-align:center}.line{border-top:1px solid #333;margin:12px 0}table{width:100%;border-collapse:collapse}th,td{padding:8px;border-bottom:1px solid #ddd;text-align:left}.n{text-align:right}.tot{font-size:20px;font-weight:bold}.row{display:flex;justify-content:space-between;padding:6px 0}</style></head><body><h1>KPM</h1><div class="center"><b>${escapeHtml(s.owner_name||'')}</b><br>${escapeHtml(s.owner_mobile||'')}<br>${escapeHtml(s.address||'')}</div><div class="line"></div><b>${escapeHtml(r.bill_no)}</b> — ${fmtDateTime(r.rental_date)}<h3>${escapeHtml(r.customer_name)}</h3>${r.mobile?escapeHtml(r.mobile):''}<div class="line"></div><table><tr><th>Item</th><th class="n">Qty</th><th class="n">Amount</th></tr>${full.lines.map(l=>`<tr><td>${escapeHtml(l.item_name)}</td><td class="n">${l.qty}</td><td class="n">${money(l.qty*l.price)}</td></tr>`).join('')}</table><div class="row"><span>Total</span><b>${money(r.total_amount)}</b></div><div class="row"><span>Discount</span><b>${money(r.discount_amount||0)}</b></div><div class="row tot"><span>Final</span><span>${money(r.final_amount??r.total_amount)}</span></div><div class="row"><span>Received</span><b>${money(r.amount_received)}</b></div><div class="row"><span>Balance</span><b>${money(bal)}</b></div><script>window.onload=()=>window.print()<\/script></body></html>`);w.document.close();}catch(e){alert(e.message);}}

/* ---------------- Return Items V2 ---------------- */
function setReturnStatus(v){returnStatusFilter=v;renderReturnRentals();}
async function renderReturnRentals(){statusFilterHtml('returnStatusChips',returnStatusFilter,'setReturnStatus');showLoading();const el=document.getElementById('returnRentalList');try{let qy=sb.from('rentals').select('*,rental_items(qty,received_qty)').in('rental_status',['ACTIVE','PARTIALLY_RETURNED']).order('rental_date',{ascending:false});if(returnStatusFilter!=='ALL')qy=qy.eq('rental_status',returnStatusFilter);const {data,error}=await qy;if(error)throw error;let list=data||[];const q=(document.getElementById('returnSearch').value||'').toLowerCase(),d=document.getElementById('returnDateFilter').value;if(q)list=list.filter(r=>(r.customer_name||'').toLowerCase().includes(q)||(r.mobile||'').includes(q)||(r.bill_no||'').toLowerCase().includes(q));if(d)list=list.filter(r=>r.rental_date?.slice(0,10)===d);el.innerHTML=list.length?list.map(r=>renderRentalCard(r,`openReturnDetail('${r.id}')`)).join(''):emptyState('↩️','No rentals waiting for return','');}catch(e){el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}hideLoading();}
function openReturnDetail(id){currentDetailId=id;nav('return-detail');}
function setReturnAll(idx){const inp=document.getElementById(`pending-${idx}`);inp.value=0;syncReturnChoice(idx);}
function syncReturnChoice(idx){const inp=document.getElementById(`pending-${idx}`),btn=document.getElementById(`allrecv-${idx}`);if(!inp||!btn)return;let v=parseInt(inp.value)||0,max=parseInt(inp.max)||0;v=Math.max(0,Math.min(v,max));inp.value=v;btn.classList.toggle('selected',v===0);}
async function renderReturnDetail(){const el=document.getElementById('returnDetailContent');showLoading();try{const full=await fetchRentalFull(currentDetailId),r=full.rental,bal=billBalance(r);hideLoading();el.innerHTML=`<div class="card"><div class="customer-highlight">${escapeHtml(r.customer_name)}</div><div class="customer-sub">${r.mobile?escapeHtml(r.mobile)+'<br>':''}${escapeHtml(r.bill_no)} • ${fmtDateTime(r.rental_date)}</div></div><div class="section-label">${t('rental_items')}</div><div class="card" id="returnLinesCard">${full.lines.map((l,i)=>{const cur=Math.max(0,l.qty-l.received_qty);return `<div class="return-row"><div class="nm">${escapeHtml(l.item_name)}</div><div class="sub">Total Qty: <b>${l.qty}</b> • Amount: <b>${money(l.qty*l.price)}</b> • Already Returned: <b>${l.received_qty}</b></div><div class="return-choice"><button id="allrecv-${i}" class="btn btn-outline all-received ${cur===0?'selected':''}" onclick="setReturnAll(${i})">✓ ${t('all_received')}</button><div class="pending-entry"><label>${t('pending_count')}</label><input id="pending-${i}" data-line="${l.id}" data-total="${l.qty}" data-received="${l.received_qty}" type="number" min="0" max="${cur}" value="${cur}" oninput="syncReturnChoice(${i})"></div></div></div>`;}).join('')}</div><div class="section-label">${t('payments')}</div><div class="card"><div class="balance-box"><span>Total / Final</span><b>${money(r.final_amount??r.total_amount)}</b></div><div class="balance-box"><span>Received</span><b>${money(r.amount_received)}</b></div><div class="balance-box"><span>Balance</span><b>${money(bal)}</b></div></div><button class="btn btn-whatsapp btn-block" style="margin-bottom:10px" onclick="sharePendingPreview()">💬 ${t('share_pending_whatsapp')}</button><button class="btn btn-success btn-block" id="confirmReturnBtn" onclick="submitReturnV2()">${t('confirm_return')}</button>`;}catch(e){hideLoading();el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}}
async function sharePendingPreview(){try{const full=await fetchRentalFull(currentDetailId);const inputs=[...document.querySelectorAll('#returnLinesCard input[data-line]')];const lines=inputs.map((x,i)=>({name:full.lines.find(l=>l.id===x.dataset.line)?.item_name||'Item',total:parseInt(x.dataset.total),pending:Math.max(0,parseInt(x.value)||0)})).filter(x=>x.pending>0);const msg=`KPM\nBill No: ${full.rental.bill_no}\nCustomer: ${full.rental.customer_name}\n\nPending Items\n${lines.length?lines.map(x=>`${x.name} - Total ${x.total} - Pending ${x.pending}`).join('\n'):'All items received'}`;if(full.rental.mobile)window.open(waLink(full.rental.mobile,msg),'_blank');else if(navigator.share)await navigator.share({text:msg});else{await navigator.clipboard.writeText(msg);toast('Pending message copied');}}catch(e){alert(e.message);}}
async function submitReturnV2(){const btn=document.getElementById('confirmReturnBtn');if(btn.disabled)return;btn.disabled=true;btn.textContent=t('saving');try{const inputs=[...document.querySelectorAll('#returnLinesCard input[data-line]')];const p_lines=inputs.map(inp=>{const total=parseInt(inp.dataset.total),oldReceived=parseInt(inp.dataset.received),maxPending=total-oldReceived;let pending=parseInt(inp.value);if(isNaN(pending))pending=maxPending;pending=Math.max(0,Math.min(pending,maxPending));return{rental_item_id:inp.dataset.line,received_qty:total-pending};});const {error}=await sb.rpc('record_return',{p_rental_id:currentDetailId,p_lines});if(error)throw error;toast('Return updated');nav('return-summary');}catch(e){alert(e.message);btn.disabled=false;btn.textContent=t('confirm_return');}}
async function sharePendingWhatsapp(rentalId){currentDetailId=rentalId;try{const full=await fetchRentalFull(rentalId),pending=full.lines.filter(l=>l.qty>l.received_qty),msg=`KPM\nBill No: ${full.rental.bill_no}\nCustomer: ${full.rental.customer_name}\n\nPending Items\n${pending.map(l=>`${l.item_name} - Total ${l.qty} - Pending ${l.qty-l.received_qty}`).join('\n')}`;if(full.rental.mobile)window.open(waLink(full.rental.mobile,msg),'_blank');else if(navigator.share)await navigator.share({text:msg});else{await navigator.clipboard.writeText(msg);toast('Message copied');}}catch(e){alert(e.message);}}

/* ---------------- Active Rental Edit V2 ---------------- */
async function renderEditRentals(){showLoading();const el=document.getElementById('editRentalsList');try{const {data,error}=await sb.from('rentals').select('*,rental_items(qty,received_qty)').eq('rental_status','ACTIVE').order('rental_date',{ascending:false});if(error)throw error;let list=data||[];const q=(document.getElementById('editRentalSearch').value||'').toLowerCase();if(q)list=list.filter(r=>(r.customer_name||'').toLowerCase().includes(q)||(r.mobile||'').includes(q)||(r.bill_no||'').toLowerCase().includes(q));el.innerHTML=list.length?list.map(r=>renderRentalCard(r,`openEditRental('${r.id}')`)).join(''):emptyState('✏️','No ACTIVE rentals available to edit','Partially returned rentals cannot be edited for stock safety');}catch(e){el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}hideLoading();}
async function openEditRental(id){currentDetailId=id;showLoading();try{editingRentalFull=await fetchRentalFull(id);await loadItemsAndStock(false);editRentalSelections={};editingRentalFull.lines.forEach(l=>editRentalSelections[l.item_id]=l.qty);hideLoading();nav('edit-rental-detail');}catch(e){hideLoading();alert(e.message);}}
function editAvailable(item){const own=editingRentalFull?.lines.find(l=>l.item_id===item.id)?.qty||0;return Math.max(0,availableQty(item)+own);}
function setEditQty(id,val){const item=ITEMS_CACHE.find(x=>x.id===id),max=editAvailable(item);let q=parseInt(val)||0;q=Math.max(0,Math.min(q,max));editRentalSelections[id]=q;renderEditRentalDetail(false);}
function adjustEditQty(id,d){setEditQty(id,(editRentalSelections[id]||0)+d);}
function renderEditRentalDetail(scroll=true){const el=document.getElementById('editRentalContent');if(!editingRentalFull){el.innerHTML=emptyState('✏️','No rental loaded','');return;}const r=editingRentalFull.rental;const selectedTotal=ITEMS_CACHE.reduce((s,it)=>s+(editRentalSelections[it.id]||0)*Number(it.price),0);el.innerHTML=`<div class="card"><div class="customer-highlight">${escapeHtml(r.customer_name)}</div><div class="customer-sub">${escapeHtml(r.bill_no)} • ${fmtDateTime(r.rental_date)}<br>Already Received Payment: ${money(r.amount_received)}</div></div><div class="section-label">Edit Rental Items</div>${ITEMS_CACHE.map(it=>{const q=editRentalSelections[it.id]||0,max=editAvailable(it);return `<div class="edit-item-row"><div class="edit-item-top"><div class="item-thumb">${it.photo_url?`<img src="${it.photo_url}">`:'🍽️'}</div><div class="item-info"><div class="nm">${escapeHtml(it.name)}</div>${it.name_en?`<div class="nmta">${escapeHtml(it.name_en)}</div>`:''}<div class="sub">${money(it.price)} • Available for this bill: ${max}</div></div></div><div class="edit-item-actions"><button onclick="adjustEditQty('${it.id}',-1)">−</button><input type="number" min="0" max="${max}" value="${q}" onchange="setEditQty('${it.id}',this.value)"><button onclick="adjustEditQty('${it.id}',1)">+</button><b style="margin-left:auto">${money(q*it.price)}</b></div></div>`;}).join('')}<div class="total-box"><div class="lbl">Updated Total Before Discount</div><div class="val">${money(selectedTotal)}</div></div><button class="btn btn-brass btn-block" id="saveEditRentalBtn" onclick="saveEditedRental()">${t('save_updated_bill')}</button>`;if(scroll)window.scrollTo(0,0);}
async function saveEditedRental(){const items=Object.entries(editRentalSelections).filter(([,q])=>q>0).map(([item_id,qty])=>({item_id,qty}));if(!items.length){toast('Rental must contain at least one item');return;}const btn=document.getElementById('saveEditRentalBtn');btn.disabled=true;btn.textContent=t('saving');try{const {error}=await sb.rpc('update_active_rental',{p_rental_id:currentDetailId,p_items:items});if(error)throw error;toast('Active rental updated');editingRentalFull=null;editRentalSelections={};navStack=['dashboard','active'];nav('detail');}catch(e){alert(e.message);btn.disabled=false;btn.textContent=t('save_updated_bill');}}

/* ---------------- History / Reports financial V2 ---------------- */
async function renderHistory(){renderHistoryChips();showLoading();const el=document.getElementById('historyList');try{let query=sb.from('rentals').select('*,rental_items(qty,received_qty)').order('rental_date',{ascending:false}).limit(500);if(historyStatusFilter!=='ALL')query=query.eq('rental_status',historyStatusFilter);const {data,error}=await query;if(error)throw error;let list=data||[];const q=(document.getElementById('historySearch').value||'').toLowerCase(),d=document.getElementById('historyDateFilter').value;if(q)list=list.filter(r=>(r.customer_name||'').toLowerCase().includes(q)||(r.mobile||'').includes(q)||(r.bill_no||'').toLowerCase().includes(q));if(d)list=list.filter(r=>r.rental_date?.slice(0,10)===d);el.innerHTML=list.length?list.map(r=>renderRentalCard(r)).join(''):emptyState('🧾','No transactions found','');}catch(e){el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}hideLoading();}
async function renderReports(){renderReportChips();showLoading();const el=document.getElementById('reportsContent');try{let query=sb.from('rentals').select('*,rental_items(item_name,qty,received_qty)');const start=rangeStart(reportRange);if(start)query=query.gte('rental_date',start.toISOString());const {data,error}=await query;if(error)throw error;const rentals=data||[],totalFinal=rentals.reduce((s,r)=>s+Number(r.final_amount??r.total_amount??0),0),totalReceived=rentals.reduce((s,r)=>s+Number(r.amount_received||0),0),outstanding=Math.max(0,totalFinal-totalReceived),pendingQty=rentals.reduce((s,r)=>s+(r.rental_items||[]).reduce((x,l)=>x+Math.max(0,l.qty-l.received_qty),0),0),active=rentals.filter(r=>r.rental_status==='ACTIVE').length,partial=rentals.filter(r=>r.rental_status==='PARTIALLY_RETURNED').length,completed=rentals.filter(r=>r.rental_status==='COMPLETED').length;const itemCounts={};rentals.forEach(r=>(r.rental_items||[]).forEach(l=>itemCounts[l.item_name]=(itemCounts[l.item_name]||0)+l.qty));const top=Object.entries(itemCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);el.innerHTML=`<div class="stat-row"><div class="stat"><div class="n">${rentals.length}</div><div class="l">Total Rentals</div></div><div class="stat success"><div class="n">${money(totalReceived)}</div><div class="l">Amount Received</div></div></div><div class="stat-row"><div class="stat warn"><div class="n">${money(outstanding)}</div><div class="l">Outstanding</div></div><div class="stat"><div class="n">${pendingQty}</div><div class="l">Pending Item Qty</div></div></div><div class="stat-row"><div class="stat"><div class="n">${active}</div><div class="l">Active</div></div><div class="stat warn"><div class="n">${partial}</div><div class="l">Partially Returned</div></div></div><div class="stat-row"><div class="stat success"><div class="n">${completed}</div><div class="l">Completed</div></div><div class="stat"><div class="n">${money(totalFinal)}</div><div class="l">Final Rental Amount</div></div></div><div class="section-label">Most Rented Items</div><div class="card">${top.length?top.map(([n,q])=>`<div class="report-row"><span class="l">${escapeHtml(n)}</span><span class="v">${q}</span></div>`).join(''):'No rentals'}</div>`;}catch(e){el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}hideLoading();}

/* ---------------- User Management V2 ---------------- */
async function renderUsers(){if(currentProfile.role!=='admin'){document.getElementById('usersList').innerHTML=emptyState('🔒','Admin only','');return;}showLoading();try{const {data,error}=await sb.from('profiles').select('*').order('created_at');if(error)throw error;document.getElementById('usersList').innerHTML=(data||[]).map(u=>`<div class="user-row"><div><div class="nm">${escapeHtml(u.full_name)} ${u.id===currentUser.id?'(you)':''}</div><div class="meta">${u.role==='admin'?t('admin'):t('staff')} • ${u.active?'Active':'Deleted/Inactive'}</div></div>${u.id!==currentUser.id?`<div class="user-actions"><button class="btn btn-outline btn-sm" onclick="openEditUser('${u.id}')">✏️ ${t('edit_user')}</button>${u.active?`<button class="btn btn-danger-outline btn-sm" onclick="deleteUserSoft('${u.id}')">🗑 ${t('delete_user')}</button>`:`<button class="btn btn-outline btn-sm" onclick="toggleUserActive('${u.id}',true)">Restore</button>`}</div>`:''}</div>`).join('')||emptyState('👤','No users','');}catch(e){document.getElementById('usersList').innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}hideLoading();}
async function openEditUser(id){const {data,error}=await sb.from('profiles').select('*').eq('id',id).single();if(error){alert(error.message);return;}openModal(`<div class="modal-header"><h3>${t('edit_user')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div><div class="field"><label>${t('full_name')}</label><input id="editUserName" value="${escapeHtml(data.full_name)}"></div><div class="field"><label>${t('role')}</label><select id="editUserRole"><option value="staff" ${data.role==='staff'?'selected':''}>${t('staff')}</option><option value="admin" ${data.role==='admin'?'selected':''}>${t('admin')}</option></select></div><button class="btn btn-brass btn-block" onclick="saveUserEdit('${id}')">Save User</button>`);}
async function saveUserEdit(id){const full_name=document.getElementById('editUserName').value.trim(),role=document.getElementById('editUserRole').value;if(!full_name){toast('Enter name');return;}const {error}=await sb.from('profiles').update({full_name,role}).eq('id',id);if(error){alert(error.message);return;}closeModal();toast('User updated');renderUsers();}
async function deleteUserSoft(id){if(!confirm('Delete this user access? Historical rentals and payments will be preserved.'))return;const {error}=await sb.from('profiles').update({active:false}).eq('id',id);if(error){alert(error.message);return;}toast('User access deleted');renderUsers();}

/* ---------------- Settings V2 ---------------- */
async function renderSettings(){const isAdmin=currentProfile?.role==='admin';showLoading();try{const s=await getShopSettings(true),card=document.getElementById('shopSettingsCard');card.innerHTML=isAdmin?`<div class="field"><label>Owner Name</label><input id="setOwner" value="${escapeHtml(s.owner_name||'')}"></div><div class="field"><label>Owner Mobile</label><input id="setOwnerMobile" value="${escapeHtml(s.owner_mobile||'')}"></div><div class="field"><label>Store Address</label><textarea id="setAddress">${escapeHtml(s.address||'')}</textarea></div><div class="field"><label>UPI Name</label><input id="setUpiName" value="${escapeHtml(s.upi_name||'KPM')}"></div><button class="btn btn-brass btn-block" onclick="saveShopSettings()">Save Store Details</button>`:`<div class="store-detail"><b>${escapeHtml(s.owner_name||'')}</b><br>${escapeHtml(s.owner_mobile||'')}<br>${escapeHtml(s.address||'')}<br>UPI: ${escapeHtml(s.upi_name||'KPM')}</div>`;const img=document.getElementById('qrPreviewImg');if(s.qr_image_url){img.src=s.qr_image_url;img.style.display='block';}else img.style.display='none';const qrBtn=document.querySelector('#screen-settings button[onclick*="qrFileInput"]');if(qrBtn)qrBtn.style.display=isAdmin?'flex':'none';}catch(e){toast(e.message);}hideLoading();}
async function saveShopSettings(){const payload={owner_name:document.getElementById('setOwner').value.trim(),owner_mobile:document.getElementById('setOwnerMobile').value.trim(),address:document.getElementById('setAddress').value.trim(),upi_name:document.getElementById('setUpiName').value.trim()||'KPM'};const {error}=await sb.from('shop_settings').update(payload).eq('id',1);if(error){alert(error.message);return;}SHOP_SETTINGS_CACHE=null;toast('Store details updated');renderSettings();}
async function handleQrUpload(e){const file=e.target.files[0];if(!file)return;showLoading();try{const blob=await resizeImageFile(file,700),path=`qr_${Date.now()}.jpg`,{error:upErr}=await sb.storage.from('shop-assets').upload(path,blob,{contentType:'image/jpeg',upsert:true});if(upErr)throw upErr;const {data:pub}=sb.storage.from('shop-assets').getPublicUrl(path),{error}=await sb.from('shop_settings').update({qr_image_url:pub.publicUrl}).eq('id',1);if(error)throw error;SHOP_SETTINGS_CACHE=null;toast('UPI QR updated');renderSettings();}catch(e2){alert(e2.message);}hideLoading();}

async function exportHistoryCsv(){showLoading();try{const {data,error}=await sb.from('rentals').select('*,rental_items(item_name,qty,price)').order('rental_date',{ascending:false}).limit(2000);if(error)throw error;const rows=[['Bill No','Customer','Mobile','Rental Date','Rental Status','Payment Status','Total','Discount','Final','Received','Balance','Items']];(data||[]).forEach(r=>rows.push([r.bill_no,r.customer_name,r.mobile||'',fmtDateTime(r.rental_date),r.rental_status,r.payment_status,r.total_amount,r.discount_amount||0,r.final_amount??r.total_amount,r.amount_received,billBalance(r),(r.rental_items||[]).map(l=>`${l.item_name} x${l.qty}`).join('; ')]));downloadCsv('kpm-all-transactions.csv',rows);toast('CSV downloaded');}catch(e){alert(e.message);}hideLoading();}
async function exportItemsCsv(){showLoading();try{await loadItemsAndStock(true);const rows=[['Tamil Name','English Name','Total Qty','Currently Rented','Available','Rate','Active']];ITEMS_CACHE.forEach(i=>rows.push([i.name,i.name_en||'',i.total_qty,OUTSTANDING_CACHE[i.id]||0,availableQty(i),i.price,i.active?'Yes':'No']));downloadCsv('kpm-items-report.csv',rows);toast('CSV downloaded');}catch(e){alert(e.message);}hideLoading();}



/* =========================================================
   KPM FRONTEND V3 — requested refinements
========================================================= */

function nav(screen, push=true){
  if(!currentUser && screen!=='login') return;
  SCREENS.forEach(s=>{ const el=document.getElementById('screen-'+s); if(el) el.classList.toggle('active', s===screen); });
  const titleMap={dashboard:'KPM',items:t('manage_items'),'new-rental':t('new_rental'),review:t('review_rental'),active:t('active_rentals'),detail:t('bill_no'),'return-rentals':t('return_items'),'return-detail':t('return_items'),'return-summary':t('return_items'),'edit-rentals':t('active_rental_edit'),'edit-rental-detail':t('active_rental_edit'),history:t('all_transactions'),reports:t('reports'),users:t('user_management'),settings:t('settings')};
  const topbar=document.getElementById('topbar');
  document.body.classList.toggle('dashboard-view',screen==='dashboard');
  if(topbar) topbar.style.display=(screen==='dashboard'?'none':'flex');
  document.getElementById('screenTitle').textContent=titleMap[screen]||'KPM';
  document.querySelectorAll('#bottomnav button').forEach(b=>b.classList.toggle('active',b.dataset.s===screen));
  document.getElementById('backBtn').style.visibility=NAV_SCREENS.includes(screen)?'hidden':'visible';
  if(push && navStack[navStack.length-1]!==screen) navStack.push(screen);
  currentScreen=screen; renderScreen(screen); window.scrollTo(0,0);
}

async function renderDashboard(){
  const en=document.getElementById('heroLangEn'),ta=document.getElementById('heroLangTa');
  if(en) en.classList.toggle('active',currentLang==='en'); if(ta) ta.classList.toggle('active',currentLang==='ta');
  document.getElementById('dashTiles').innerHTML=`
    <button class="tile primary" onclick="startNewRental()"><span class="ic">➕</span><span class="lbl">${t('new_rental')}</span></button>
    <button class="tile" onclick="nav('active')"><span class="ic">📦</span><span class="lbl">${t('active_rentals')}</span></button>
    <button class="tile" onclick="nav('return-rentals')"><span class="ic">↩️</span><span class="lbl">${t('return_items')}</span></button>
    <button class="tile" onclick="nav('edit-rentals')"><span class="ic">✏️</span><span class="lbl">${t('active_rental_edit')}</span></button>
    <button class="tile" onclick="nav('items')"><span class="ic">🍽️</span><span class="lbl">${t('manage_items')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">💰</span><span class="lbl">${t('payments')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">🧾</span><span class="lbl">${t('all_transactions')}</span></button>
    <button class="tile" onclick="nav('reports')"><span class="ic">📊</span><span class="lbl">${t('reports')}</span></button>
    ${currentProfile.role==='admin'?`<button class="tile" onclick="nav('users')"><span class="ic">👤</span><span class="lbl">${t('user_management')}</span></button>`:''}
    <button class="tile" onclick="nav('settings')"><span class="ic">⚙️</span><span class="lbl">${t('settings')}</span></button>`;
  showLoading();
  try{
    const {data,error}=await sb.from('rentals').select('id,rental_status'); if(error) throw error;
    const rows=data||[],activeCount=rows.filter(r=>r.rental_status==='ACTIVE').length,pendingCount=rows.filter(r=>r.rental_status==='PARTIALLY_RETURNED').length;
    document.getElementById('dashAlerts').innerHTML='';
    document.getElementById('dashStats').innerHTML=`<div class="stat"><div class="n num">${activeCount}</div><div class="l">${t('active_transactions')}</div></div><div class="stat warn"><div class="n num">${pendingCount}</div><div class="l">${t('pending_transactions')}</div></div>`;
  }catch(e){document.getElementById('dashStats').innerHTML=`<div class="alert danger" style="grid-column:1/-1">${escapeHtml(e.message)}</div>`;}
  hideLoading();
}

function conditionalFinanceHtml(r,compact=false){
  const total=Number(r.total_amount||0),discount=Number(r.discount_amount||0),final=Number(r.final_amount??total),received=Number(r.amount_received||0),balance=Math.max(0,final-received);
  const rows=[`<div class="balance-box financial-total"><span class="l">Total Amount</span><span class="v num">${money(total)}</span></div>`];
  if(discount>0){rows.push(`<div class="balance-box"><span class="l">Discount</span><span class="v num">− ${money(discount)}</span></div>`);rows.push(`<div class="balance-box financial-final"><span class="l">Final Amount</span><span class="v num">${money(final)}</span></div>`);}
  if(received>0) rows.push(`<div class="balance-box"><span class="l">Received Amount</span><span class="v num">${money(received)}</span></div>`);
  if(balance>0) rows.push(`<div class="balance-box"><span class="l">${compact?'Pending Amount':'Balance Amount'}</span><span class="v num" style="color:var(--danger)">${money(balance)}</span></div>`);
  return rows.join('');
}

function buildBillMessage(r,lines,s){
  const total=Number(r.total_amount||0),discount=Number(r.discount_amount||0),final=Number(r.final_amount??total),received=Number(r.amount_received||0),bal=Math.max(0,final-received);
  const amounts=[`Total Amount: ${money(total)}`];
  if(discount>0){amounts.push(`Discount: ${money(discount)}`);amounts.push(`Final Amount: ${money(final)}`);}
  if(received>0) amounts.push(`Received Amount: ${money(received)}`);
  if(bal>0) amounts.push(`Pending Amount: ${money(bal)}`);
  return `KPM\n${s.owner_name||'K Ponnumani Murugesan'}\nMobile: ${s.owner_mobile||'9940841872'}\n${s.address||'105, Arasamara Street, Panpoli - 627807'}\n\nBill No: ${r.bill_no}\nDate: ${fmtDateTime(r.rental_date)}\nCustomer: ${r.customer_name}${r.mobile?'\nMobile: '+r.mobile:''}${r.address?'\nAddress: '+r.address:''}\n\n${lines.map(l=>`${l.item_name} - Qty ${l.qty} - ${money(l.qty*l.price)}`).join('\n')}\n\n${amounts.join('\n')}`;
}

function billScreenHtml(r,lines,s){
  const logo='assets/amman.png';
  return `<div class="card bill-v3" id="billCard"><div class="bill-v3-head"><div class="bill-v3-kpm">KPM</div><div class="bill-v3-meta"><b>${escapeHtml(s.owner_name||'K Ponnumani Murugesan')}</b><br>Proprietor<br>☎ ${escapeHtml(s.owner_mobile||'9940841872')}<br>⌖ ${escapeHtml(s.address||'105, Arasamara Street, Panpoli - 627807')}</div><div class="bill-v3-meta"><b>Bill No.</b> : ${escapeHtml(r.bill_no)}<br><b>Date & Time</b> : ${fmtDateTime(r.rental_date)}<br><b>Customer</b> : ${escapeHtml(r.customer_name)}${r.mobile?`<br><b>Mobile</b> : ${escapeHtml(r.mobile)}`:''}${r.address?`<br><b>Address</b> : ${escapeHtml(r.address)}`:''}</div><img class="bill-v3-logo" src="${logo}" alt="Amman"></div>
  <div class="bill-v3-table-head"><span>ITEM</span><span class="num">QTY</span><span class="num">RATE</span><span class="num">AMOUNT</span></div>${lines.map(l=>`<div class="bill-v3-row"><div><b>${escapeHtml(l.item_name)}</b></div><div class="num"><b>${l.qty}</b></div><div class="num rate">${money(l.price)}</div><div class="num"><b>${money(l.qty*l.price)}</b></div></div>`).join('')}<div class="bill-v3-finance">${conditionalFinanceHtml(r)}</div></div>`;
}

async function renderDetail(){
  const el=document.getElementById('detailContent');showLoading();
  try{
    const full=await fetchRentalFull(currentDetailId),s=await getShopSettings();hideLoading();const {rental:r,lines,pays}=full,bal=billBalance(r);
    el.innerHTML=`${billScreenHtml(r,lines,s)}<div class="bill-actions"><button class="btn btn-whatsapp" onclick="shareBillPdf('${r.id}')">💬 ${t('whatsapp_bill')}</button><button class="btn btn-outline" onclick="printBill('${r.id}')">🖨️ ${t('print_bill')}</button></div>
    <div class="section-label">${t('payments')}</div>${bal>0?`<button class="btn btn-brass btn-block" onclick="openPaymentForm('${r.id}',${bal})">💰 ${t('record_payment')}</button>`:''}<button class="btn btn-outline btn-block qr-action" onclick="showPaymentQr()">▣ Show UPI QR</button><button class="btn btn-outline btn-block" style="margin-top:10px" onclick="openDiscountForm('${r.id}',${Number(r.total_amount)},${Number(r.discount_amount||0)})">🏷️ ${t('discount')}</button>${pays.length?`<div class="section-label">${t('payment_history')}</div><div class="card">${pays.map(p=>`<div class="balance-box"><span class="l">${fmtDateTime(p.paid_at)}${p.note?' — '+escapeHtml(p.note):''}</span><span class="v">${money(p.amount)}</span></div>`).join('')}</div>`:''}`;
  }catch(e){hideLoading();el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}
}

function buildPdfTemplate(r,lines,s){
  const total=Number(r.total_amount||0),discount=Number(r.discount_amount||0),final=Number(r.final_amount??total),received=Number(r.amount_received||0),balance=Math.max(0,final-received);
  const finance=[['Total Amount',money(total)]];if(discount>0){finance.push(['Discount',money(discount)]);finance.push(['Final Amount',money(final)]);}if(received>0)finance.push(['Received Amount',money(received)]);if(balance>0)finance.push(['Pending Amount',money(balance)]);
  return `<div class="pdf-sheet"><div class="pdf-header"><div class="pdf-kpm">KPM</div><div class="pdf-owner"><b>${escapeHtml(s.owner_name||'K Ponnumani Murugesan')}</b><br>Proprietor<br>☎ ${escapeHtml(s.owner_mobile||'9940841872')}<br>⌖ ${escapeHtml(s.address||'105, Arasamara Street, Panpoli - 627807')}</div><div class="pdf-billmeta"><b>▣ Bill No.</b> : ${escapeHtml(r.bill_no)}<br><b>▦ Date & Time</b> : ${fmtDateTime(r.rental_date)}<br><b>● Customer</b> : <b>${escapeHtml(r.customer_name)}</b>${r.mobile?`<br><b>☎ Mobile</b> : ${escapeHtml(r.mobile)}`:''}${r.address?`<br><b>⌖ Address</b> : ${escapeHtml(r.address)}`:''}</div><img class="pdf-amman" src="assets/amman.png" alt="Amman"></div>
  <div class="pdf-table"><div class="pdf-th"><span>#</span><span>ITEM</span><span class="pdf-num">QTY</span><span class="pdf-num">RATE</span><span class="pdf-num">AMOUNT</span></div>${lines.map((l,i)=>`<div class="pdf-tr"><span>${i+1}</span><span><b>${escapeHtml(l.item_name)}</b></span><span class="pdf-num">${l.qty}</span><span class="pdf-num">Rs ${Math.round(l.price)}</span><span class="pdf-num">Rs ${Math.round(l.qty*l.price)}</span></div>`).join('')}</div>
  <div class="pdf-amounts">${finance.map(([l,v])=>`<div class="pdf-amt"><span>${l}</span><b>${v.replace('₹','Rs ')}</b></div>`).join('')}</div><div class="pdf-thanks">🙏 &nbsp; Thank you! Vanakkam &nbsp; 🙏</div></div>`;
}

async function createBillPdfBlob(r,lines,s){
  if(!window.jspdf?.jsPDF||!window.html2canvas) throw new Error('PDF library is not loaded');
  const host=document.createElement('div');host.className='pdf-render-host';host.innerHTML=buildPdfTemplate(r,lines,s);document.body.appendChild(host);
  try{await Promise.all([...host.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():new Promise(res=>{img.onload=img.onerror=res;})));const canvas=await html2canvas(host.querySelector('.pdf-sheet'),{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false});const {jsPDF}=window.jspdf,doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'}),img=canvas.toDataURL('image/jpeg',0.96),pageW=210,pageH=297,ratio=Math.min(pageW/canvas.width,pageH/canvas.height),w=canvas.width*ratio,h=canvas.height*ratio;doc.addImage(img,'JPEG',(pageW-w)/2,0,w,h,'','FAST');return doc.output('blob');}finally{host.remove();}
}

async function shareBillPdf(id){
  showLoading('Preparing PDF...');
  try{
    const full=await fetchRentalFull(id),s=await getShopSettings(),blob=await createBillPdfBlob(full.rental,full.lines,s),file=new File([blob],`${full.rental.bill_no}.pdf`,{type:'application/pdf'}),msg=buildBillMessage(full.rental,full.lines,s);hideLoading();
    if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({title:`KPM ${full.rental.bill_no}`,text:msg,files:[file]});return;}
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500);
    if(full.rental.mobile){window.open(waLink(full.rental.mobile,msg),'_blank');toast('PDF saved and customer WhatsApp chat opened. Attach the PDF and Send.');}else if(navigator.share){await navigator.share({text:msg});}else{toast('PDF downloaded. Mobile number is not available for WhatsApp.');}
  }catch(e){hideLoading();if(e?.name!=='AbortError')alert(e.message);}
}

async function printBill(id){
  showLoading('Preparing print bill...');try{const full=await fetchRentalFull(id),s=await getShopSettings(),blob=await createBillPdfBlob(full.rental,full.lines,s),url=URL.createObjectURL(blob);hideLoading();const w=window.open(url,'_blank');if(!w)toast('Allow popups to open the print bill.');setTimeout(()=>URL.revokeObjectURL(url),60000);}catch(e){hideLoading();alert(e.message);}
}

function openPaymentForm(rentalId,balance){openModal(`<div class="modal-header"><h3>${t('record_payment')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div><div class="field"><label>${t('balance')}: ${money(balance)}</label><input type="number" id="payAmountInput" min="1" max="${balance}" placeholder="Amount received"></div><div class="field"><label>${t('notes')}</label><input type="text" id="payNoteInput" placeholder="Optional"></div><button class="btn btn-brass btn-block" id="savePaymentBtn" onclick="savePayment('${rentalId}',${balance})">${t('record_payment')}</button><button class="btn btn-outline btn-block qr-action" onclick="showPaymentQr()">▣ Show UPI QR</button>`);}

async function showPaymentQr(){
  try{const s=await getShopSettings(true);if(!s.qr_image_url){toast('UPI QR is not configured. Add it from Settings.');return;}openModal(`<div class="modal-header"><h3>UPI Payment</h3><button class="modal-close" onclick="closeModal()">✕</button></div><div class="payment-qr-wrap"><div class="payment-qr-name">${escapeHtml(s.upi_name||'KPM')}</div><img src="${escapeHtml(s.qr_image_url)}" alt="UPI QR"><div class="pdf-note">Scan this QR to make the payment.</div></div>`,'center');}catch(e){alert(e.message);}
}

function returnBillPreviewHtml(r,lines,s){return `<div class="return-bill-preview">${billScreenHtml(r,lines,s)}</div>`;}
function setReturnAll(idx){const inp=document.getElementById(`pending-${idx}`),btn=document.getElementById(`allrecv-${idx}`);if(!inp||!btn)return;const max=parseInt(inp.max)||0;if(parseInt(inp.value)===0){inp.value=inp.dataset.lastPending||max;}else{inp.dataset.lastPending=inp.value;inp.value=0;}syncReturnChoice(idx);}
function syncReturnChoice(idx){const inp=document.getElementById(`pending-${idx}`),btn=document.getElementById(`allrecv-${idx}`);if(!inp||!btn)return;let v=parseInt(inp.value);const max=parseInt(inp.max)||0;if(isNaN(v))v=max;v=Math.max(0,Math.min(v,max));inp.value=v;btn.classList.toggle('selected',v===0);}
async function renderReturnDetail(){
  const el=document.getElementById('returnDetailContent');showLoading();
  try{const full=await fetchRentalFull(currentDetailId),s=await getShopSettings(),r=full.rental,bal=billBalance(r);hideLoading();el.innerHTML=`${returnBillPreviewHtml(r,full.lines,s)}<div class="section-label">Return Items</div><div class="card" id="returnLinesCard">${full.lines.map((l,i)=>{const cur=Math.max(0,l.qty-l.received_qty);return `<div class="return-item-line"><div class="return-item-name">${escapeHtml(l.item_name)}</div><div class="return-inline"><div class="return-actual">Qty <b>${l.qty}</b>${l.received_qty?`<div class="sub">Returned ${l.received_qty}</div>`:''}</div><div class="return-pending-wrap"><label>Pending</label><input id="pending-${i}" data-line="${l.id}" data-total="${l.qty}" data-received="${l.received_qty}" data-last-pending="${cur}" type="number" min="0" max="${cur}" value="${cur}" oninput="syncReturnChoice(${i})"></div><button id="allrecv-${i}" class="btn btn-outline return-all-btn ${cur===0?'selected':''}" onclick="setReturnAll(${i})">✓ All</button></div></div>`;}).join('')}</div><div class="section-label">${t('payments')}</div><div class="card">${conditionalFinanceHtml(r,true)}</div>${bal>0?`<button class="btn btn-brass btn-block" style="margin-bottom:10px" onclick="openPaymentForm('${r.id}',${bal})">💰 ${t('record_payment')}</button>`:''}<button class="btn btn-outline btn-block" style="margin-bottom:10px" onclick="showPaymentQr()">▣ Show UPI QR</button><button class="btn btn-whatsapp btn-block" style="margin-bottom:10px" onclick="sharePendingPreview()">💬 ${t('share_pending_whatsapp')}</button><button class="btn btn-success btn-block" id="confirmReturnBtn" onclick="submitReturnV2()">${t('confirm_return')}</button>`;}catch(e){hideLoading();el.innerHTML=`<div class="alert danger">${escapeHtml(e.message)}</div>`;}
}


async function openEditRental(id){currentDetailId=id;showLoading();try{editingRentalFull=await fetchRentalFull(id);await loadItemsAndStock(true);editRentalSelections={};editingRentalFull.lines.forEach(l=>editRentalSelections[l.item_id]=l.qty);hideLoading();nav('edit-rental-detail');}catch(e){hideLoading();alert(e.message);}}

function currentEditItemIds(){return Object.entries(editRentalSelections).filter(([,q])=>Number(q)>0).map(([id])=>id);}
function renderEditRentalDetail(scroll=true){
  const el=document.getElementById('editRentalContent');if(!editingRentalFull){el.innerHTML=emptyState('✏️','No rental loaded','');return;}
  const r=editingRentalFull.rental,ids=currentEditItemIds(),selectedItems=ids.map(id=>ITEMS_CACHE.find(x=>x.id===id)).filter(Boolean),selectedTotal=selectedItems.reduce((s,it)=>s+(editRentalSelections[it.id]||0)*Number(it.price),0);
  el.innerHTML=`<div class="card"><div class="customer-highlight">${escapeHtml(r.customer_name)}</div><div class="customer-sub">${escapeHtml(r.bill_no)} • ${fmtDateTime(r.rental_date)}<br>Received Payment: ${money(r.amount_received)}</div></div><div class="section-label">Bill Items</div><div class="edit-bill-items">${selectedItems.map(it=>{const q=editRentalSelections[it.id]||0,max=editAvailable(it);return `<div class="edit-item-row"><div class="edit-item-top"><div class="item-thumb">${it.photo_url?`<img src="${it.photo_url}">`:'🍽️'}</div><div class="item-info"><div class="nm">${escapeHtml(it.name)}</div>${it.name_en?`<div class="nmta">${escapeHtml(it.name_en)}</div>`:''}<div class="sub">${money(it.price)} • Available: ${max}</div></div></div><div class="edit-item-actions"><button onclick="adjustEditQty('${it.id}',-1)">−</button><input type="number" min="0" max="${max}" value="${q}" onchange="setEditQty('${it.id}',this.value)"><button onclick="adjustEditQty('${it.id}',1)">+</button><b style="margin-left:auto">${money(q*it.price)}</b><button class="edit-delete" onclick="removeEditRentalItem('${it.id}')">🗑</button></div></div>`;}).join('')}</div><button class="btn btn-outline btn-block add-rental-item-btn" onclick="openAddRentalItem()">➕ Add New Item</button><div class="total-box"><div class="lbl">Updated Total Before Discount</div><div class="val">${money(selectedTotal)}</div></div><button class="btn btn-brass btn-block" id="saveEditRentalBtn" onclick="saveEditedRental()">${t('save_updated_bill')}</button>`;if(scroll)window.scrollTo(0,0);
}
function removeEditRentalItem(id){const it=ITEMS_CACHE.find(x=>x.id===id);if(!it)return;if(!confirm(`Remove ${it.name} from this bill?`))return;editRentalSelections[id]=0;renderEditRentalDetail(false);}
function openAddRentalItem(){const current=new Set(currentEditItemIds()),choices=ITEMS_CACHE.filter(i=>i.active&&!current.has(i.id));if(!choices.length){toast('No more items available to add');return;}openModal(`<div class="modal-header"><h3>Add New Item</h3><button class="modal-close" onclick="closeModal()">✕</button></div><div>${choices.map(it=>`<div class="add-item-choice"><div class="item-thumb">${it.photo_url?`<img src="${it.photo_url}">`:'🍽️'}</div><div class="grow"><div class="nm">${escapeHtml(it.name)}</div><div class="sub">${money(it.price)} • Available ${editAvailable(it)}</div></div><button class="btn btn-brass btn-sm" onclick="addItemToEditedRental('${it.id}')">Add</button></div>`).join('')}</div>`);}
function addItemToEditedRental(id){const item=ITEMS_CACHE.find(x=>x.id===id);if(!item)return;const max=editAvailable(item);if(max<=0){toast('No stock available');return;}editRentalSelections[id]=1;closeModal();renderEditRentalDetail(false);}



/* =========================================================
   KPM FRONTEND V4 OVERRIDES
========================================================= */

function applyStaticI18n(){
  document.getElementById('langEnBtn')?.classList.toggle('active', currentLang==='en');
  document.getElementById('langTaBtn')?.classList.toggle('active', currentLang==='ta');
  document.getElementById('heroLangEn')?.classList.toggle('active', currentLang==='en');
  document.getElementById('heroLangTa')?.classList.toggle('active', currentLang==='ta');
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent=t(el.getAttribute('data-i18n')); });
  const setText=(id,val)=>{const el=document.getElementById(id); if(el) el.textContent=val;};
  setText('dashShopName','KPM'); setText('loginTitleShop','KPM'); setText('lblEmail',t('email')); setText('lblPassword',t('password'));
  setText('loginBtn',t('login_btn')); setText('allItemsLabel',t('all_items')); setText('step1Label',t('step1_select'));
  setText('step2Label',t('step2_customer')); setText('lblCustName',t('customer_name')+' *'); setText('lblMobile',t('mobile_optional'));
  setText('lblAddress',t('address')); setText('lblNotes',t('notes')); setText('estAmtLbl',t('total_amount_lbl'));
  setText('reviewBtn',t('show_bill')); setText('qrLabel',t('qr_code')); setText('uploadQrLbl',t('upload_qr')); setText('logoutLbl2',t('logout'));
  const addBtn=document.getElementById('addItemBtn'); if(addBtn) addBtn.innerHTML='➕ '+t('add_new_item');
}

async function renderDashboard(){
  document.getElementById('dashTiles').innerHTML=`
    <button class="tile primary" onclick="startNewRental()"><span class="ic">➕</span><span class="lbl">${t('new_rental')}</span></button>
    <button class="tile" onclick="nav('active')"><span class="ic">📦</span><span class="lbl">${t('active_rentals')}</span></button>
    <button class="tile" onclick="nav('return-rentals')"><span class="ic">↩️</span><span class="lbl">${t('return_items')}</span></button>
    <button class="tile" onclick="nav('edit-rentals')"><span class="ic">✏️</span><span class="lbl">${t('active_rental_edit')}</span></button>
    <button class="tile" onclick="nav('items')"><span class="ic">🍽️</span><span class="lbl">${t('manage_items')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">💰</span><span class="lbl">${t('payments')}</span></button>
    <button class="tile" onclick="nav('history')"><span class="ic">🧾</span><span class="lbl">${t('all_transactions')}</span></button>
    <button class="tile" onclick="nav('reports')"><span class="ic">📊</span><span class="lbl">${t('reports')}</span></button>
    ${currentProfile.role==='admin'?`<button class="tile" onclick="nav('users')"><span class="ic">👤</span><span class="lbl">${t('user_management')}</span></button>`:''}
    <button class="tile" onclick="nav('settings')"><span class="ic">⚙️</span><span class="lbl">${t('settings')}</span></button>`;
  showLoading();
  try{
    const {data,error}=await sb.from('rentals').select('id,rental_status');
    if(error) throw error;
    const rows=data||[];
    const activeCount=rows.filter(r=>r.rental_status==='ACTIVE').length;
    const pendingTxnCount=rows.filter(r=>r.rental_status==='PARTIALLY_RETURNED').length;
    document.getElementById('dashAlerts').innerHTML='';
    document.getElementById('dashStats').innerHTML=`
      <div class="stat"><div class="n num">${activeCount}</div><div class="l">${t('active_transactions')}</div></div>
      <div class="stat warn"><div class="n num">${pendingTxnCount}</div><div class="l">${t('pending_transactions')}</div></div>`;
  }catch(e){document.getElementById('dashStats').innerHTML=`<div class="alert danger" style="grid-column:1/-1">${escapeHtml(e.message)}</div>`;}
  hideLoading();
}

function billScreenHtml(r,lines,s){
  return `<div class="card bill-app-v4" id="billCard">
    <div class="bill-app-title"><div class="kpm">KPM</div><div class="billno">${escapeHtml(r.bill_no)}</div></div>
    <div class="bill-app-owner"><b>${escapeHtml(s.owner_name||'K Ponnumani Murugesan')}</b><br>${escapeHtml(s.owner_mobile||'9940841872')}<br>${escapeHtml(s.address||'105, Arasamara Street, Panpoli - 627807')}</div>
    <div class="bill-app-customer"><div class="name">${escapeHtml(r.customer_name)}</div>${r.mobile?`<div class="line">${escapeHtml(r.mobile)}</div>`:''}${r.address?`<div class="line">${escapeHtml(r.address)}</div>`:''}<div class="line">${fmtDateTime(r.rental_date)}</div></div>
    <div class="bill-v4-section">${t('rental_items')}</div>
    <table class="bill-table"><thead><tr><th>${t('product')}</th><th class="num">QTY</th><th class="num">AMOUNT</th></tr></thead><tbody>${lines.map(l=>`<tr><td><b>${escapeHtml(l.item_name)}</b><br><small>${money(l.price)} each</small></td><td class="num"><b>${l.qty}</b></td><td class="num"><b>${money(l.qty*l.price)}</b></td></tr>`).join('')}</tbody></table>
    <div class="bill-finance-v4">${conditionalFinanceHtml(r)}</div>
  </div>`;
}

function buildPdfTemplate(r,lines,s){
  const total=Number(r.total_amount||0),discount=Number(r.discount_amount||0),final=Number(r.final_amount??total),received=Number(r.amount_received||0),balance=Math.max(0,final-received);
  const finance=[['Total Amount',`Rs ${Math.round(total)}`,'']];
  if(discount>0) finance.push(['Discount',`Rs -${Math.round(discount)}`,'']);
  if(received>0) finance.push(['Received Amount',`Rs ${Math.round(received)}`,'']);
  if(discount>0) finance.push(['Final Amount',`Rs ${Math.round(final)}`,'final']);
  if(balance>0) finance.push(['Pending Amount',`Rs ${Math.round(balance)}`,'pending']);
  return `<div class="pdf-sheet-v4">
    <div class="pdf-v4-header">
      <div class="pdf-v4-kpm">KPM</div>
      <div class="pdf-v4-owner"><b>● &nbsp;${escapeHtml(s.owner_name||'K Ponnumani Murugesan')}</b><span>Proprietor</span><span>☎ &nbsp;${escapeHtml(s.owner_mobile||'9940841872')}</span><span>⌖ &nbsp;${escapeHtml(s.address||'105, Arasamara Street, Panpoli - 627807')}</span></div>
      <div class="pdf-v4-meta"><b>▣ &nbsp;Bill No.</b> &nbsp;: ${escapeHtml(r.bill_no)}<br><b>▦ &nbsp;Date & Time</b> &nbsp;: ${fmtDateTime(r.rental_date)}<br><b>● &nbsp;Customer</b> &nbsp;: <b>${escapeHtml(r.customer_name)}</b>${r.mobile?`<br><b>☎ &nbsp;Mobile</b> &nbsp;: ${escapeHtml(r.mobile)}`:''}${r.address?`<br><b>⌖ &nbsp;Address</b> &nbsp;: ${escapeHtml(r.address)}`:''}</div>
      <img class="pdf-v4-amman" src="assets/amman-white.jpg" alt="Amman">
    </div>
    <div class="pdf-v4-table">
      <div class="pdf-v4-th"><span>#</span><span>ITEM</span><span class="pdf-v4-num">QTY</span><span class="pdf-v4-num">RATE</span><span class="pdf-v4-num">AMOUNT</span></div>
      ${lines.map((l,i)=>`<div class="pdf-v4-tr"><span>${i+1}</span><span class="item">${escapeHtml(l.item_name)}</span><span class="pdf-v4-num">${l.qty}</span><span class="pdf-v4-num">Rs ${Math.round(l.price)}</span><span class="pdf-v4-num">Rs ${Math.round(l.qty*l.price)}</span></div>`).join('')}
    </div>
    <div class="pdf-v4-spacer"></div>
    <div class="pdf-v4-amounts">${finance.map(([l,v,c])=>`<div class="pdf-v4-amt ${c}"><span>${l}</span><b>${v}</b></div>`).join('')}</div>
    <div class="pdf-v4-thanks"><span class="hands">♧</span>— &nbsp; Thank you! Vanakkam &nbsp; —</div>
  </div>`;
}

async function createBillPdfBlob(r,lines,s){
  if(!window.jspdf?.jsPDF||!window.html2canvas) throw new Error('PDF library is not loaded');
  const host=document.createElement('div');host.className='pdf-render-host';host.innerHTML=buildPdfTemplate(r,lines,s);document.body.appendChild(host);
  try{
    await Promise.all([...host.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():new Promise(res=>{img.onload=img.onerror=res;})));
    const sheet=host.querySelector('.pdf-sheet-v4');
    const canvas=await html2canvas(sheet,{scale:1.8,useCORS:true,backgroundColor:'#ffffff',logging:false});
    const {jsPDF}=window.jspdf,doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const img=canvas.toDataURL('image/jpeg',0.97),pageW=210,pageH=297;
    doc.addImage(img,'JPEG',0,0,pageW,pageH,'','FAST');
    return doc.output('blob');
  }finally{host.remove();}
}

function downloadPdfBlob(blob,filename){
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),7000);
}

/* Browser rule: direct wa.me can target the customer but cannot attach a local Blob/PDF.
   Therefore V4 deliberately restores customer-chat-first behavior and auto-downloads the PDF. */
async function shareBillPdf(id){
  showLoading('Preparing PDF...');
  try{
    const full=await fetchRentalFull(id),s=await getShopSettings(),blob=await createBillPdfBlob(full.rental,full.lines,s),filename=`${full.rental.bill_no}.pdf`,msg=`KPM Bill ${full.rental.bill_no}`;
    downloadPdfBlob(blob,filename);
    hideLoading();
    if(full.rental.mobile){
      window.location.href=waLink(full.rental.mobile,msg);
      return;
    }
    const file=new File([blob],filename,{type:'application/pdf'});
    if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({title:msg,files:[file]});return;}
    toast('PDF downloaded. Customer mobile number is not available.');
  }catch(e){hideLoading();if(e?.name!=='AbortError')alert(e.message);}
}

function buildPendingPdfTemplate(r,pending,s){
  return `<div class="pdf-sheet-v4">
    <div class="pdf-v4-header">
      <div class="pdf-v4-kpm">KPM</div>
      <div class="pdf-v4-owner"><b>● &nbsp;${escapeHtml(s.owner_name||'K Ponnumani Murugesan')}</b><span>Proprietor</span><span>☎ &nbsp;${escapeHtml(s.owner_mobile||'9940841872')}</span><span>⌖ &nbsp;${escapeHtml(s.address||'105, Arasamara Street, Panpoli - 627807')}</span></div>
      <div class="pdf-v4-meta"><b>▣ &nbsp;Bill No.</b> &nbsp;: ${escapeHtml(r.bill_no)}<br><b>▦ &nbsp;Date & Time</b> &nbsp;: ${fmtDateTime(r.rental_date)}<br><b>● &nbsp;Customer</b> &nbsp;: <b>${escapeHtml(r.customer_name)}</b>${r.mobile?`<br><b>☎ &nbsp;Mobile</b> &nbsp;: ${escapeHtml(r.mobile)}`:''}${r.address?`<br><b>⌖ &nbsp;Address</b> &nbsp;: ${escapeHtml(r.address)}`:''}</div>
      <img class="pdf-v4-amman" src="assets/amman-white.jpg" alt="Amman">
    </div>
    <div style="font-size:24px;font-weight:900;margin-top:25px;margin-bottom:12px;color:#071a3a">PENDING ITEMS</div>
    <div class="pdf-v4-table"><div class="pdf-v4-pending-th"><span>#</span><span>ITEM</span><span class="pdf-v4-num">TOTAL QTY</span><span class="pdf-v4-num">PENDING QTY</span></div>${pending.map((l,i)=>`<div class="pdf-v4-pending-tr"><span>${i+1}</span><span class="item"><b>${escapeHtml(l.name||l.item_name)}</b></span><span class="pdf-v4-num">${l.total??l.qty}</span><span class="pdf-v4-num"><b>${l.pending}</b></span></div>`).join('')}</div>
    <div class="pdf-v4-spacer"></div><div class="pdf-v4-thanks"><span class="hands">♧</span>— &nbsp; Thank you! Vanakkam &nbsp; —</div>
  </div>`;
}

async function createPendingPdfBlob(r,pending,s){
  if(!window.jspdf?.jsPDF||!window.html2canvas) throw new Error('PDF library is not loaded');
  const host=document.createElement('div');host.className='pdf-render-host';host.innerHTML=buildPendingPdfTemplate(r,pending,s);document.body.appendChild(host);
  try{
    await Promise.all([...host.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():new Promise(res=>{img.onload=img.onerror=res;})));
    const canvas=await html2canvas(host.querySelector('.pdf-sheet-v4'),{scale:1.8,useCORS:true,backgroundColor:'#fff',logging:false});
    const {jsPDF}=window.jspdf,doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});doc.addImage(canvas.toDataURL('image/jpeg',0.97),'JPEG',0,0,210,297,'','FAST');return doc.output('blob');
  }finally{host.remove();}
}

async function sharePendingPdf(r,pending){
  showLoading('Preparing pending PDF...');
  try{
    const s=await getShopSettings(),blob=await createPendingPdfBlob(r,pending,s),filename=`${r.bill_no}-PENDING.pdf`,msg=`KPM Pending Items - ${r.bill_no}`;
    downloadPdfBlob(blob,filename);hideLoading();
    if(r.mobile){window.location.href=waLink(r.mobile,msg);return;}
    const file=new File([blob],filename,{type:'application/pdf'});if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({title:msg,files:[file]});return;}toast('Pending PDF downloaded. Customer mobile number is not available.');
  }catch(e){hideLoading();if(e?.name!=='AbortError')alert(e.message);}
}

async function sharePendingPreview(){
  try{
    const full=await fetchRentalFull(currentDetailId),inputs=[...document.querySelectorAll('#returnLinesCard input[data-line]')];
    const pending=inputs.map(x=>{const line=full.lines.find(l=>l.id===x.dataset.line);return{name:line?.item_name||'Item',total:parseInt(x.dataset.total)||0,pending:Math.max(0,parseInt(x.value)||0)};}).filter(x=>x.pending>0);
    if(!pending.length){toast('No pending items to share');return;}
    await sharePendingPdf(full.rental,pending);
  }catch(e){alert(e.message);}
}

async function sharePendingWhatsapp(rentalId){
  try{
    const full=await fetchRentalFull(rentalId),pending=full.lines.filter(l=>l.qty>l.received_qty).map(l=>({name:l.item_name,total:l.qty,pending:l.qty-l.received_qty}));
    if(!pending.length){toast('No pending items to share');return;}
    await sharePendingPdf(full.rental,pending);
  }catch(e){alert(e.message);}
}


/* =========================================================
   INIT
========================================================= */
updateOnlineStatus();
applyStaticI18n();
initAuth();
