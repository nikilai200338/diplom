const API_READY_DATA_MODEL = {
  Performer: "id, name, role, email, password, rate, activeProjectsCount, completedProjectsCount, nearestDeadline, status, contacts, notes",
  Project: "id, title, client, description, status, startDate, draftDeadline, finalDeadline, shootingDates, location, coordinates, performers, clientPayment, expenses, equipment, files, chat, profit",
  Expense: "id, projectId|null, category, title, amount, date, comment, receiptFile, type",
  EquipmentItem: "id, name, quantity, pricePerUnit, rentalDays, totalPrice",
  CalendarEvent: "id, title, description, startDateTime, endDateTime, projectId, performerId, status, priority, type",
  FinanceDocument: "id, projectId|null, type, title, amount, date, pdfFile, receiptFile, myTaxLink, comment",
  MapPoint: "id, projectId, title, location, coordinates, shootingDateStart, shootingDateEnd, status"
};

const storeKey = "voskresenskyProductionSystem.v2";
const expenseCategories = ["Аренда оборудования", "Транспорт", "Монтаж", "Цветокоррекция", "Звук", "Музыка", "Реквизит", "Локация", "Питание", "Подписки", "Офис", "Реклама", "Прочее"];
const typicalExpenses = ["Камера Sony FX6", "Операторская смена", "Такси на площадку", "Монтаж ролика", "Цветокоррекция", "Музыкальная лицензия", "Аренда студии", "Кейтеринг", "PDF-счёт", "Самозанятый чек", "Своя трата"];

const mockData = {
  performers: [
    { id: "pf-1", name: "Алексей Орлов", role: "Оператор", email: "alex.camera@mail.ru", password: "cam-4821", rate: 18000, activeProjectsCount: 2, completedProjectsCount: 14, nearestDeadline: "2026-05-27", status: "Занят", contacts: "+7 999 111-22-33, Telegram @orlovcam", notes: "Сильный репортаж и свет на корпоративных съёмках." },
    { id: "pf-2", name: "Мария Лисина", role: "Монтажёр", email: "maria.edit@mail.ru", password: "edit-7780", rate: 22000, activeProjectsCount: 3, completedProjectsCount: 21, nearestDeadline: "2026-05-25", status: "На проекте", contacts: "+7 999 222-33-44, Telegram @lisinaedit", notes: "Хорошо держит темп, любит подробные ТЗ." },
    { id: "pf-3", name: "Дмитрий Волков", role: "Звукорежиссёр", email: "d.volkov@mail.ru", password: "sound-1902", rate: 12000, activeProjectsCount: 1, completedProjectsCount: 9, nearestDeadline: "2026-06-02", status: "Свободен", contacts: "+7 999 333-44-55", notes: "Выездной звук и чистка интервью." },
    { id: "pf-4", name: "Екатерина Соколова", role: "Продюсер", email: "kat.producer@mail.ru", password: "prod-4410", rate: 25000, activeProjectsCount: 2, completedProjectsCount: 17, nearestDeadline: "2026-05-29", status: "Занят", contacts: "Telegram @sokolovaprod", notes: "Локации, согласования, документы." },
    { id: "pf-5", name: "Иван Морозов", role: "Колорист", email: "ivan.color@mail.ru", password: "color-9931", rate: 16000, activeProjectsCount: 1, completedProjectsCount: 12, nearestDeadline: "2026-06-05", status: "Свободен", contacts: "+7 999 555-66-77", notes: "DaVinci Resolve, рекламный цвет." }
  ],
  projects: [
    {
      id: "pr-1",
      title: "Корпоративный фильм для VEKA",
      client: "VEKA Rus",
      description: "Имиджевый ролик о производстве и команде компании.",
      status: "В работе",
      startDate: "2026-05-18",
      draftDeadline: "2026-05-27",
      finalDeadline: "2026-06-03",
      shootingDates: [{ start: "2026-05-21", end: "2026-05-22" }],
      location: "Москва, БЦ Сенатор",
      coordinates: [55.7558, 37.6176],
      performers: ["pf-1", "pf-2", "pf-4"],
      clientPayment: 420000,
      expenses: [
        { id: "ex-1", projectId: "pr-1", category: "Монтаж", title: "Монтаж черновика", amount: 48000, date: "2026-05-24", comment: "Первая версия для клиента", receiptFile: "edit-invoice.pdf", type: "project" },
        { id: "ex-2", projectId: "pr-1", category: "Транспорт", title: "Логистика команды", amount: 9500, date: "2026-05-21", comment: "Такси и грузовой каршеринг", receiptFile: "transport-check.pdf", type: "project" }
      ],
      equipment: [
        { id: "eq-1", name: "Sony FX6", quantity: 1, pricePerUnit: 9000, rentalDays: 2 },
        { id: "eq-2", name: "Комплект света Aputure", quantity: 2, pricePerUnit: 3500, rentalDays: 2 }
      ],
      files: [
        { id: "fl-1", category: "ТЗ", title: "brief-veka.pdf", url: "#", date: "2026-05-18" },
        { id: "fl-2", category: "Чек", title: "transport-check.pdf", url: "#", date: "2026-05-21" }
      ],
      chat: [
        { author: "Екатерина Соколова", role: "Продюсер", time: "10:15", text: "Клиент подтвердил второй съёмочный день, пропуск на всех готов." },
        { author: "Мария Лисина", role: "Монтажёр", time: "13:40", text: "Соберу черновик с интервью до вечера 25 мая." }
      ]
    },
    {
      id: "pr-2",
      title: "Запуск продукта StartupX",
      client: "StartupX",
      description: "Серия коротких промо и вертикальных роликов для запуска приложения.",
      status: "Планирование",
      startDate: "2026-05-24",
      draftDeadline: "2026-06-01",
      finalDeadline: "2026-06-08",
      shootingDates: [{ start: "2026-05-29", end: "2026-05-29" }],
      location: "Санкт-Петербург, Севкабель Порт",
      coordinates: [59.9242, 30.2412],
      performers: ["pf-1", "pf-3"],
      clientPayment: 280000,
      expenses: [
        { id: "ex-3", projectId: "pr-2", category: "Музыка", title: "Лицензия на трек", amount: 12000, date: "2026-05-24", comment: "Коммерческое использование", receiptFile: "music-license.pdf", type: "project" }
      ],
      equipment: [
        { id: "eq-3", name: "DJI RS 4 Pro", quantity: 1, pricePerUnit: 4500, rentalDays: 1 }
      ],
      files: [{ id: "fl-3", category: "Сценарий", title: "startupx-script.docx", url: "#", date: "2026-05-23" }],
      chat: [{ author: "Дмитрий Волков", role: "Звукорежиссёр", time: "09:20", text: "Возьму петлички и рекордер, на площадке может быть шумно." }]
    },
    {
      id: "pr-3",
      title: "YouTube-серия AutoBlog",
      client: "AutoBlog Studio",
      description: "Третий выпуск серии с тест-драйвом и студийными вставками.",
      status: "Монтаж",
      startDate: "2026-05-10",
      draftDeadline: "2026-05-25",
      finalDeadline: "2026-05-30",
      shootingDates: [{ start: "2026-05-12", end: "2026-05-13" }],
      location: "Москва, автодром ADM Raceway",
      coordinates: [55.5175, 37.9606],
      performers: ["pf-2", "pf-5"],
      clientPayment: 190000,
      expenses: [
        { id: "ex-4", projectId: "pr-3", category: "Цветокоррекция", title: "Цвет выпуска", amount: 26000, date: "2026-05-22", comment: "DaVinci project", receiptFile: "color.pdf", type: "project" },
        { id: "ex-5", projectId: "pr-3", category: "Питание", title: "Питание на площадке", amount: 7800, date: "2026-05-12", comment: "Команда 6 человек", receiptFile: "food.pdf", type: "project" }
      ],
      equipment: [],
      files: [{ id: "fl-4", category: "Видео", title: "episode3-preview.mp4", url: "#", date: "2026-05-22" }],
      chat: [{ author: "Иван Морозов", role: "Колорист", time: "18:05", text: "Первый проход по цвету готов, отправил превью." }]
    }
  ],
  generalExpenses: [
    { id: "ex-g-1", projectId: null, category: "Подписки", title: "Музыкальная библиотека", amount: 6900, date: "2026-05-05", comment: "Месячная подписка", receiptFile: "music-sub.pdf", type: "general" },
    { id: "ex-g-2", projectId: null, category: "Офис", title: "Коворкинг и переговорка", amount: 18000, date: "2026-05-12", comment: "Встречи с клиентами", receiptFile: "office.pdf", type: "general" },
    { id: "ex-g-3", projectId: null, category: "Реклама", title: "Таргет на портфолио", amount: 15000, date: "2026-05-17", comment: "Лиды на июнь", receiptFile: "ads.pdf", type: "general" }
  ],
  documents: [
    { id: "doc-1", projectId: "pr-1", type: "Счёт", title: "Счёт VEKA 50%", amount: 210000, date: "2026-05-18", pdfFile: "invoice-veka.pdf", receiptFile: "", myTaxLink: "https://lknpd.nalog.ru/", comment: "Предоплата" },
    { id: "doc-2", projectId: "pr-1", type: "Чек", title: "Чек транспорт", amount: 9500, date: "2026-05-21", pdfFile: "", receiptFile: "transport-check.pdf", myTaxLink: "", comment: "Проектная трата" },
    { id: "doc-3", projectId: null, type: "PDF", title: "Музыкальная подписка", amount: 6900, date: "2026-05-05", pdfFile: "music-sub.pdf", receiptFile: "music-sub.pdf", myTaxLink: "", comment: "Общая трата" }
  ],
  events: [
    { id: "ev-today-1", title: "Утренний созвон по VEKA", description: "Сверить план монтажа и список правок", startDateTime: "2026-05-23T10:00", endDateTime: "2026-05-23T10:45", projectId: "pr-1", performerId: "pf-2", status: "Запланировано", priority: "Высокий", type: "meeting" },
    { id: "ev-today-2", title: "Внутренний дедлайн по сценарию", description: "Подготовить финальную версию сценарного плана", startDateTime: "2026-05-23T13:00", endDateTime: "2026-05-23T14:00", projectId: "pr-2", performerId: "pf-4", status: "В работе", priority: "Средний", type: "deadline" },
    { id: "ev-today-3", title: "Проверка материалов AutoBlog", description: "Отобрать удачные дубли и отметить проблемные кадры", startDateTime: "2026-05-23T16:30", endDateTime: "2026-05-23T18:00", projectId: "pr-3", performerId: "pf-5", status: "Запланировано", priority: "Средний", type: "task" },
    { id: "ev-1", title: "Съёмка VEKA", description: "Производство и интервью", startDateTime: "2026-05-21T10:00", endDateTime: "2026-05-21T18:00", projectId: "pr-1", performerId: "pf-1", status: "Запланировано", priority: "Высокий", type: "shoot" },
    { id: "ev-2", title: "Дедлайн черновика AutoBlog", description: "Отправить клиенту первую версию", startDateTime: "2026-05-25T17:00", endDateTime: "2026-05-25T18:00", projectId: "pr-3", performerId: "pf-2", status: "В работе", priority: "Высокий", type: "deadline" },
    { id: "ev-3", title: "Созвон StartupX", description: "Утвердить сценарий", startDateTime: "2026-05-24T12:00", endDateTime: "2026-05-24T13:00", projectId: "pr-2", performerId: "pf-4", status: "Запланировано", priority: "Средний", type: "meeting" },
    { id: "ev-4", title: "Цвет VEKA", description: "Тестовый LUT и кадры", startDateTime: "2026-05-28T11:00", endDateTime: "2026-05-28T15:00", projectId: "pr-1", performerId: "pf-5", status: "Запланировано", priority: "Средний", type: "task" }
  ],
  globalChat: [
    { author: "Николай", role: "Режиссёр", time: "09:05", text: "Коллеги, сегодня сверяем дедлайны по VEKA и AutoBlog." },
    { author: "Мария Лисина", role: "Монтажёр", time: "09:18", text: "AutoBlog держу в работе, к вечеру будет короткий апдейт." }
  ]
};

let state = loadState();
let calendarDate = new Date("2026-05-23T12:00:00");
let calendarView = "month";
let financeTab = "projects";
let leafletMap = null;
let mapLayers = [];
let mapHeatLayer = null;
let financeCharts = {};
let projectView = "active";
let projectLocationMap = null;
let projectLocationMarker = null;
const markerVisibleZoom = 10;

document.addEventListener("DOMContentLoaded", () => {
  bindGlobalActions();
  hydrateDerivedData();
  const page = document.body.dataset.page;
  if (page === "dashboard") renderDashboard();
  if (page === "performers") renderPerformersPage();
  if (page === "projects") renderProjectsPage();
  if (page === "finances") renderFinancesPage();
  if (page === "calendar") renderCalendarPage();
  if (page === "map") renderMapPage();
});

function loadState() {
  const saved = localStorage.getItem(storeKey);
  if (saved) return migrateState(JSON.parse(saved));
  localStorage.setItem(storeKey, JSON.stringify(mockData));
  return migrateState(structuredClone(mockData));
}
function migrateState(nextState) {
  nextState.projects = nextState.projects || [];
  nextState.events = nextState.events || [];
  const archivedSeeds = archivedProjectSeeds();
  archivedSeeds.forEach((project) => {
    if (!nextState.projects.some((item) => item.id === project.id)) {
      nextState.projects.push(project);
    }
  });
  todayCalendarSeeds().forEach((event) => {
    if (!nextState.events.some((item) => item.id === event.id)) {
      nextState.events.push(event);
    }
  });
  nextState.projects.forEach((project) => {
    if (project.status === "Завершён" && !project.archivedAt) {
      project.archivedAt = project.finalDeadline || project.startDate || localISODate();
    }
  });
  localStorage.setItem(storeKey, JSON.stringify(nextState));
  return nextState;
}
function todayCalendarSeeds() {
  return [
    { id: "ev-today-1", title: "Утренний созвон по VEKA", description: "Сверить план монтажа и список правок", startDateTime: "2026-05-23T10:00", endDateTime: "2026-05-23T10:45", projectId: "pr-1", performerId: "pf-2", status: "Запланировано", priority: "Высокий", type: "meeting" },
    { id: "ev-today-2", title: "Внутренний дедлайн по сценарию", description: "Подготовить финальную версию сценарного плана", startDateTime: "2026-05-23T13:00", endDateTime: "2026-05-23T14:00", projectId: "pr-2", performerId: "pf-4", status: "В работе", priority: "Средний", type: "deadline" },
    { id: "ev-today-3", title: "Проверка материалов AutoBlog", description: "Отобрать удачные дубли и отметить проблемные кадры", startDateTime: "2026-05-23T16:30", endDateTime: "2026-05-23T18:00", projectId: "pr-3", performerId: "pf-5", status: "Запланировано", priority: "Средний", type: "task" }
  ];
}
function archivedProjectSeeds() {
  return [
    {
      id: "pr-archive-1",
      title: "Рекламный ролик Coffee Lab",
      client: "Coffee Lab",
      description: "Короткий ролик для запуска новой кофейной линейки и Reels-версии.",
      status: "Завершён",
      archivedAt: "2026-04-20",
      startDate: "2026-04-02",
      draftDeadline: "2026-04-12",
      finalDeadline: "2026-04-20",
      shootingDates: [{ start: "2026-04-05", end: "2026-04-05" }],
      location: "Москва, Даниловский рынок",
      coordinates: [55.7119, 37.6227],
      performers: ["pf-1", "pf-2", "pf-5"],
      clientPayment: 160000,
      expenses: [
        { id: "ex-a-1", projectId: "pr-archive-1", category: "Локация", title: "Аренда зоны съёмки", amount: 18000, date: "2026-04-05", comment: "Утренний слот", receiptFile: "coffee-location.pdf", type: "project" },
        { id: "ex-a-2", projectId: "pr-archive-1", category: "Монтаж", title: "Финальный монтаж", amount: 24000, date: "2026-04-14", comment: "16:9 и вертикальные версии", receiptFile: "coffee-edit.pdf", type: "project" }
      ],
      equipment: [{ id: "eq-a-1", name: "Компактный свет Nanlite", quantity: 2, pricePerUnit: 1800, rentalDays: 1 }],
      files: [{ id: "fl-a-1", category: "Видео", title: "coffee-lab-final.mp4", url: "#", date: "2026-04-20" }],
      chat: [{ author: "Мария Лисина", role: "Монтажёр", time: "16:10", text: "Финальные версии отданы, клиент подтвердил публикацию." }]
    },
    {
      id: "pr-archive-2",
      title: "Aftermovie TechConf",
      client: "TechConf",
      description: "Итоговый ролик конференции с интервью спикеров и динамикой площадки.",
      status: "Завершён",
      archivedAt: "2026-03-28",
      startDate: "2026-03-10",
      draftDeadline: "2026-03-20",
      finalDeadline: "2026-03-28",
      shootingDates: [{ start: "2026-03-15", end: "2026-03-16" }],
      location: "Санкт-Петербург, Экспофорум",
      coordinates: [59.7637, 30.3575],
      performers: ["pf-1", "pf-3", "pf-4"],
      clientPayment: 310000,
      expenses: [
        { id: "ex-a-3", projectId: "pr-archive-2", category: "Звук", title: "Запись интервью", amount: 22000, date: "2026-03-16", comment: "Петлички и чистка", receiptFile: "techconf-sound.pdf", type: "project" },
        { id: "ex-a-4", projectId: "pr-archive-2", category: "Транспорт", title: "Командировка", amount: 36000, date: "2026-03-15", comment: "Поезд и трансфер", receiptFile: "techconf-trip.pdf", type: "project" }
      ],
      equipment: [{ id: "eq-a-2", name: "Sony FX6", quantity: 2, pricePerUnit: 8500, rentalDays: 2 }],
      files: [{ id: "fl-a-2", category: "Счёт", title: "techconf-invoice-final.pdf", url: "#", date: "2026-03-28" }],
      chat: [{ author: "Екатерина Соколова", role: "Продюсер", time: "11:30", text: "Проект закрыт, акт и финальный счёт отправлены." }]
    }
  ];
}
function saveState() {
  hydrateDerivedData();
  localStorage.setItem(storeKey, JSON.stringify(state));
}
function hydrateDerivedData() {
  state.projects.forEach((project) => {
    project.equipment = (project.equipment || []).map((item) => ({ ...item, totalPrice: Number(item.quantity) * Number(item.pricePerUnit) * Number(item.rentalDays) }));
    project.profit = project.clientPayment - projectExpenses(project);
  });
  state.performers.forEach((performer) => {
    const related = state.projects.filter((project) => project.performers.includes(performer.id));
    performer.activeProjectsCount = related.filter((project) => project.status !== "Завершён").length;
    performer.completedProjectsCount = performer.completedProjectsCount || 0;
    performer.nearestDeadline = related.map((project) => project.finalDeadline).sort()[0] || performer.nearestDeadline;
  });
}
function allExpenses() {
  return [...state.projects.flatMap((project) => project.expenses || []), ...(state.generalExpenses || [])];
}
function projectEquipmentTotal(project) {
  return (project.equipment || []).reduce((sum, item) => sum + Number(item.totalPrice || (item.quantity * item.pricePerUnit * item.rentalDays)), 0);
}
function projectExpenses(project) {
  return (project.expenses || []).reduce((sum, expense) => sum + Number(expense.amount), 0) + projectEquipmentTotal(project);
}
function totals() {
  const income = state.projects.reduce((sum, project) => sum + Number(project.clientPayment || 0), 0);
  const projectCosts = state.projects.reduce((sum, project) => sum + projectExpenses(project), 0);
  const generalCosts = (state.generalExpenses || []).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  return { income, expenses: projectCosts + generalCosts, profit: income - projectCosts - generalCosts, projectCosts, generalCosts };
}
function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(Number(value || 0));
}
function formatDate(value) {
  if (!value) return "Не указано";
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}
function formatDateTime(value) {
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
function localISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}
function byId(id) { return document.getElementById(id); }
function projectById(id) { return state.projects.find((project) => project.id === id); }
function performerById(id) { return state.performers.find((performer) => performer.id === id); }
function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function bindGlobalActions() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action], [data-export], [data-close-modal]");
    if (!target) return;
    if (target.dataset.closeModal !== undefined) closeModal();
    if (target.dataset.export) exportDataset(target.dataset.export);
    if (target.dataset.action === "open-performer-create") openPerformerForm();
    if (target.dataset.action === "open-project-create") openProjectForm();
    if (target.dataset.action === "open-expense-create") openExpenseForm();
    if (target.dataset.action === "open-event-create") openEventForm();
    if (target.dataset.action === "reset-performer-filters") resetPerformerFilters();
    if (target.dataset.action === "reset-project-filters") resetProjectFilters();
  });
  const modal = byId("app-modal");
  if (modal) modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
}
function openModal(title, body, options = {}) {
  const modal = byId("app-modal");
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal__content ${options.wide ? "modal__content--wide" : ""}">
      <div class="modal__head">
        <div>
          <h2 class="modal__title">${title}</h2>
          ${options.note ? `<p class="section-note">${options.note}</p>` : ""}
        </div>
        <button class="close-btn" data-close-modal aria-label="Закрыть">×</button>
      </div>
      ${body}
    </div>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  const modal = byId("app-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = "";
}

function renderKpis(root, items) {
  root.innerHTML = items.map((item) => `
    <article class="card kpi clickable" ${item.href ? `onclick="location.href='${item.href}'"` : ""}>
      <div class="kpi__label">${item.label}</div>
      <div class="kpi__value">${item.value}</div>
      <div class="kpi__meta">${item.meta}</div>
    </article>`).join("");
}

function renderDashboard() {
  const total = totals();
  renderKpis(byId("dashboard-kpis"), [
    { label: "Активные проекты", value: state.projects.filter((p) => p.status !== "Завершён").length, meta: "В производстве и планировании", href: "projects-page.html" },
    { label: "Ближайшие дедлайны", value: upcomingProjectDeadlines().length, meta: "На ближайшие 14 дней", href: "calendar.html" },
    { label: "Исполнители в работе", value: state.performers.filter((p) => p.activeProjectsCount > 0).length, meta: "Задействованы в проектах", href: "performers.html" },
    { label: "Чистая прибыль", value: formatMoney(total.profit), meta: `${formatMoney(total.income)} доход / ${formatMoney(total.expenses)} расход`, href: "finances.html" }
  ]);
  byId("dashboard-projects").innerHTML = state.projects.slice(0, 4).map(projectCard).join("");
  byId("dashboard-events").innerHTML = calendarEventsWithDeadlines().sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)).slice(0, 6).map(eventListItem).join("");
  byId("dashboard-finance").innerHTML = [
    ["Доходы по проектам", total.income],
    ["Проектные расходы", total.projectCosts],
    ["Общие расходы", total.generalCosts],
    ["Прибыль", total.profit]
  ].map(([label, value]) => `<div class="list-item"><span>${label}</span><strong>${formatMoney(value)}</strong></div>`).join("");
  byId("dashboard-performers").innerHTML = state.performers.filter((p) => p.activeProjectsCount > 0).slice(0, 5).map((p) => `
    <div class="list-item clickable" onclick="location.href='performers.html'">
      <div><strong>${p.name}</strong><p class="list-item__text">${p.role} · ${formatMoney(p.rate)}</p></div>
      <span class="status ${statusClass(p.status)}">${p.status}</span>
    </div>`).join("");
  byId("dashboard-notifications").innerHTML = [
    "У проекта VEKA дедлайн черновика через 4 дня.",
    "В финансах есть 2 документа без привязки к проекту.",
    "На карте доступна выгрузка точек съёмок за месяц."
  ].map((text) => `<div class="list-item"><span>${text}</span></div>`).join("");
  renderChat(byId("global-chat"), state.globalChat, addGlobalMessage);
}
function addGlobalMessage(text) {
  if (!text.trim()) return;
  state.globalChat.push({ author: "Николай", role: "Режиссёр", time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }), text: text.trim() });
  saveState();
  renderDashboard();
}

function renderPerformersPage() {
  renderKpis(byId("performer-kpis"), [
    { label: "Всего исполнителей", value: state.performers.length, meta: "В базе команды" },
    { label: "Свободны", value: state.performers.filter((p) => p.status === "Свободен").length, meta: "Можно ставить в проект" },
    { label: "Средняя ставка", value: formatMoney(state.performers.reduce((s, p) => s + p.rate, 0) / state.performers.length), meta: "За смену или этап" },
    { label: "Закрыто проектов", value: state.performers.reduce((s, p) => s + p.completedProjectsCount, 0), meta: "Суммарный опыт базы" }
  ]);
  const roleSelect = byId("performer-role");
  roleSelect.innerHTML = `<option value="">Все роли</option>${[...new Set(state.performers.map((p) => p.role))].map((role) => `<option>${role}</option>`).join("")}`;
  ["performer-search", "performer-role", "performer-status", "performer-sort"].forEach((id) => byId(id).addEventListener("input", renderPerformerCards));
  renderPerformerCards();
}
function renderPerformerCards() {
  const search = byId("performer-search").value.toLowerCase();
  const role = byId("performer-role").value;
  const status = byId("performer-status").value;
  const sort = byId("performer-sort").value;
  let list = state.performers.filter((p) => [p.name, p.role, p.email].join(" ").toLowerCase().includes(search));
  if (role) list = list.filter((p) => p.role === role);
  if (status) list = list.filter((p) => p.status === status);
  list.sort((a, b) => {
    if (sort === "rate-desc") return b.rate - a.rate;
    if (sort === "rate-asc") return a.rate - b.rate;
    if (sort === "completed-desc") return b.completedProjectsCount - a.completedProjectsCount;
    if (sort === "active-desc") return b.activeProjectsCount - a.activeProjectsCount;
    return new Date(a.nearestDeadline) - new Date(b.nearestDeadline);
  });
  byId("performers-grid").innerHTML = list.map(performerCard).join("") || `<div class="empty">Исполнители не найдены.</div>`;
}
function performerCard(performer) {
  return `
    <article class="card performer-card clickable" data-performer-id="${performer.id}" onclick="openPerformerDetails('${performer.id}')">
      <div class="card-top">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="avatar">${performer.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
          <div><h3 class="entity-name">${performer.name}</h3><p class="entity-meta">${performer.role} · ${performer.email}</p></div>
        </div>
        <span class="status ${statusClass(performer.status)}">${performer.status}</span>
      </div>
      <div class="stats-row">
        <div class="mini-stat"><span>Ставка</span><strong>${formatMoney(performer.rate)}</strong></div>
        <div class="mini-stat"><span>В работе</span><strong>${performer.activeProjectsCount}</strong></div>
        <div class="mini-stat"><span>Завершено</span><strong>${performer.completedProjectsCount}</strong></div>
      </div>
      <div class="list-item"><span>Ближайший дедлайн</span><strong>${formatDate(performer.nearestDeadline)}</strong></div>
    </article>`;
}
function statusClass(status) {
  if (status === "Свободен") return "status--active";
  if (status === "Занят" || status === "На проекте") return "status--busy";
  if (status === "Завершён") return "status--done";
  return "";
}
function openPerformerDetails(id) {
  const p = performerById(id);
  const projects = state.projects.filter((project) => project.performers.includes(id));
  openModal(p.name, `
    <div class="grid grid--2">
      <div class="panel">
        <p><strong>Роль:</strong> ${p.role}</p><p><strong>Email:</strong> ${p.email}</p><p><strong>Пароль для выдачи:</strong> ${p.password}</p>
        <p><strong>Ставка:</strong> ${formatMoney(p.rate)}</p><p><strong>Контакты:</strong> ${p.contacts}</p><p><strong>Заметка:</strong> ${p.notes || "Нет"}</p>
      </div>
      <div class="panel">
        <h3 class="section-title">Проекты исполнителя</h3>
        <div class="list" style="margin-top:12px">${projects.map((project) => `<div class="list-item"><div><strong>${project.title}</strong><p class="list-item__text">${project.client}</p></div><span class="status">${project.status}</span></div>`).join("") || "Пока нет проектов"}</div>
      </div>
    </div>`, { note: "Подробная карточка готова к привязке к backend/API.", wide: true });
}
function openPerformerForm() {
  openModal("Добавить исполнителя", `
    <form id="performer-form" class="form-grid">
      ${input("name", "Имя", "text", true)}
      ${input("role", "Роль", "text", true)}
      ${input("email", "Email", "email", true)}
      ${input("password", "Пароль для исполнителя", "text", true)}
      ${input("rate", "Ставка", "number", true)}
      ${input("contacts", "Контактные данные", "text", true)}
      <div class="form-row"><label>Статус</label><select name="status" class="select"><option>Свободен</option><option>Занят</option><option>На проекте</option></select></div>
      <div class="form-row"><label>Ближайший дедлайн</label><input name="nearestDeadline" class="input" type="date"></div>
      <div class="form-row form-row--wide"><label>Комментарий</label><textarea name="notes" class="textarea"></textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green" type="submit">Сохранить</button><button class="btn" type="button" data-close-modal>Отменить</button></div>
    </form>`);
  byId("performer-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    state.performers.push({ id: uid("pf"), ...data, rate: Number(data.rate), activeProjectsCount: 0, completedProjectsCount: 0 });
    saveState();
    closeModal();
    rerenderCurrentPage();
  });
}
function resetPerformerFilters() {
  ["performer-search", "performer-role", "performer-status"].forEach((id) => { if (byId(id)) byId(id).value = ""; });
  if (byId("performer-sort")) byId("performer-sort").value = "deadline";
  renderPerformerCards();
}

function renderProjectsPage() {
  const activeProjects = state.projects.filter((project) => !isArchivedProject(project));
  const archivedProjects = state.projects.filter(isArchivedProject);
  renderKpis(byId("project-kpis"), [
    { label: "Активных", value: activeProjects.length, meta: "Отображаются в работе" },
    { label: "В архиве", value: archivedProjects.length, meta: "Завершены и доступны отдельно" },
    { label: "Доход", value: formatMoney(totals().income), meta: "Оплата клиентов" },
    { label: "Прибыль проектов", value: formatMoney(totals().income - totals().projectCosts), meta: "С учётом архива" }
  ]);
  byId("project-status").innerHTML = `<option value="">Все статусы</option>${[...new Set(state.projects.map((p) => p.status))].map((status) => `<option>${status}</option>`).join("")}`;
  byId("project-performer").innerHTML = `<option value="">Все исполнители</option>${state.performers.map((p) => `<option value="${p.id}">${p.name} · ${p.role}</option>`).join("")}`;
  ["project-search", "project-status", "project-performer", "project-sort"].forEach((id) => byId(id).addEventListener("input", renderProjectCards));
  document.querySelectorAll("[data-project-view]").forEach((button) => {
    button.addEventListener("click", () => {
      projectView = button.dataset.projectView;
      document.querySelectorAll("[data-project-view]").forEach((item) => item.classList.toggle("active", item === button));
      renderProjectCards();
    });
  });
  renderProjectCards();
}
function isArchivedProject(project) {
  return project.status === "Завершён" || Boolean(project.archivedAt);
}
function renderProjectCards() {
  const search = byId("project-search").value.toLowerCase();
  const status = byId("project-status").value;
  const performer = byId("project-performer").value;
  const sort = byId("project-sort").value;
  let list = state.projects.filter((p) => projectView === "archive" ? isArchivedProject(p) : !isArchivedProject(p));
  list = list.filter((p) => [p.title, p.client, p.location, p.description].join(" ").toLowerCase().includes(search));
  if (status) list = list.filter((p) => p.status === status);
  if (performer) list = list.filter((p) => p.performers.includes(performer));
  list.sort((a, b) => {
    if (sort === "profit-desc") return b.profit - a.profit;
    if (sort === "payment-desc") return b.clientPayment - a.clientPayment;
    if (sort === "expenses-desc") return projectExpenses(b) - projectExpenses(a);
    return new Date(a.draftDeadline) - new Date(b.draftDeadline);
  });
  byId("projects-grid").innerHTML = list.map(projectCard).join("") || `<div class="empty">${projectView === "archive" ? "В архиве пока нет проектов." : "Активные проекты не найдены."}</div>`;
}
function projectCard(project) {
  const margin = project.clientPayment ? Math.round((project.profit / project.clientPayment) * 100) : 0;
  return `
    <article class="card project-card clickable" onclick="openProjectDetails('${project.id}')">
      <div class="card-top">
        <div><h3 class="entity-name">${project.title}</h3><p class="entity-meta">${project.client} · ${project.location}</p></div>
        <span class="status ${project.status === "В работе" ? "status--active" : project.status === "Монтаж" ? "status--busy" : ""}">${project.status}</span>
      </div>
      <p class="section-note">${project.description}</p>
      <div class="stats-row">
        <div class="mini-stat"><span>Оплата</span><strong>${formatMoney(project.clientPayment)}</strong></div>
        <div class="mini-stat"><span>Расходы</span><strong>${formatMoney(projectExpenses(project))}</strong></div>
        <div class="mini-stat"><span>Прибыль</span><strong class="${project.profit >= 0 ? "money-positive" : "money-negative"}">${formatMoney(project.profit)}</strong></div>
      </div>
      <div class="progress"><span style="width:${Math.max(0, Math.min(100, margin))}%"></span></div>
      <div class="inline-actions">${project.performers.map((id) => `<span class="pill">${performerById(id)?.role || "Исполнитель"}</span>`).join("")}</div>
      <div class="list-item"><span>Черновик: ${formatDate(project.draftDeadline)}</span><strong>Чистовик: ${formatDate(project.finalDeadline)}</strong></div>
    </article>`;
}
function openProjectDetails(id) {
  const project = projectById(id);
  openModal(project.title, projectDetailsHtml(project), { wide: true, note: "Все блоки рассчитаны на замену mock-данных ответами backend/API." });
  bindProjectDetailForms(project.id);
}
function projectDetailsHtml(project) {
  const performerOptions = state.performers.map((p) => `<option value="${p.id}">${p.name} · ${p.role} · ${formatMoney(p.rate)} · ${p.status}</option>`).join("");
  return `
    <div class="tabs">
      <button class="tab active">Карточка проекта</button>
      <button class="btn btn--ghost" onclick="openProjectForm('${project.id}')">Редактировать</button>
      ${isArchivedProject(project) ? `<button class="btn" onclick="restoreProject('${project.id}')">Вернуть в активные</button>` : `<button class="btn btn--green" onclick="archiveProject('${project.id}')">Завершить проект</button>`}
    </div>
    <div class="grid grid--2">
      <div class="panel">
        <h3 class="section-title">Данные проекта</h3>
        <div class="list" style="margin-top:12px">
          <div class="list-item"><span>Клиент</span><strong>${project.client}</strong></div>
          <div class="list-item"><span>Статус</span><strong>${project.status}</strong></div>
          <div class="list-item"><span>Старт</span><strong>${formatDate(project.startDate)}</strong></div>
          <div class="list-item"><span>Дедлайны</span><strong>${formatDate(project.draftDeadline)} / ${formatDate(project.finalDeadline)}</strong></div>
          <div class="list-item"><span>Место съёмки</span><strong>${project.location}</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Прибыль</h3>
        <div class="list" style="margin-top:12px">
          <div class="list-item"><span>Доход</span><strong>${formatMoney(project.clientPayment)}</strong></div>
          <div class="list-item"><span>Расходы</span><strong>${formatMoney(projectExpenses(project))}</strong></div>
          <div class="list-item"><span>Прибыль</span><strong>${formatMoney(project.profit)}</strong></div>
          <div class="list-item"><span>Маржинальность</span><strong>${project.clientPayment ? Math.round(project.profit / project.clientPayment * 100) : 0}%</strong></div>
        </div>
      </div>
    </div>
    <div class="grid grid--2" style="margin-top:14px">
      <div class="panel">
        <div class="section-head"><h3 class="section-title">Исполнители проекта</h3></div>
        <form id="project-performer-form" class="chat__form">
          <select name="performerId" class="select">${performerOptions}</select>
          <button class="btn btn--green">Добавить</button>
        </form>
        <div class="list" style="margin-top:12px">${project.performers.map((id) => {
          const p = performerById(id);
          return `<div class="list-item"><div><strong>${p?.name}</strong><p class="list-item__text">${p?.role} · ${formatMoney(p?.rate)} · ${p?.status}</p></div><span class="badge">Дедлайн ${formatDate(p?.nearestDeadline)}</span></div>`;
        }).join("")}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Файлы проекта</h3>
        <form id="project-file-form" class="form-grid" style="margin-top:12px">
          <div class="form-row"><label>Категория</label><select name="category" class="select"><option>Чек</option><option>Видео</option><option>ТЗ</option><option>Сценарий</option><option>Документ</option></select></div>
          <div class="form-row"><label>Файл</label><input name="title" class="input" type="file"></div>
          <div class="form-row form-row--wide"><button class="btn">Прикрепить</button></div>
        </form>
        <div class="list" style="margin-top:12px">${(project.files || []).map((file) => `<div class="list-item"><span>${file.category}</span><strong>${file.title}</strong></div>`).join("")}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Оборудование и аренда</h3>
        <form id="equipment-form" class="form-grid" style="margin-top:12px">
          ${input("name", "Название", "text", true)}
          ${input("quantity", "Количество", "number", true, 1)}
          ${input("pricePerUnit", "Цена за единицу", "number", true)}
          ${input("rentalDays", "Дней аренды", "number", true, 1)}
          <div class="form-row form-row--wide"><button class="btn btn--green">Добавить оборудование</button></div>
        </form>
        <div class="list" style="margin-top:12px">${(project.equipment || []).map((item) => `<div class="list-item"><span>${item.name}: ${item.quantity} × ${formatMoney(item.pricePerUnit)} × ${item.rentalDays} дн.</span><strong>${formatMoney(item.totalPrice)}</strong></div>`).join("")}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Расходы проекта</h3>
        ${expenseFormHtml("project-expense-form", project.id)}
        <div class="list" style="margin-top:12px">${(project.expenses || []).map((expense) => `<div class="list-item"><div><strong>${expense.title}</strong><p class="list-item__text">${expense.category} · ${expense.comment}</p></div><strong>${formatMoney(expense.amount)}</strong></div>`).join("")}</div>
      </div>
      <div class="panel form-row--wide">
        <h3 class="section-title">Чат проекта</h3>
        <div id="project-chat" class="chat" style="margin-top:12px"></div>
      </div>
    </div>`;
}
function bindProjectDetailForms(projectId) {
  const project = projectById(projectId);
  const performerForm = byId("project-performer-form");
  if (performerForm) performerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = new FormData(event.currentTarget).get("performerId");
    if (!project.performers.includes(id)) project.performers.push(id);
    saveState();
    openProjectDetails(projectId);
  });
  const equipmentForm = byId("equipment-form");
  if (equipmentForm) equipmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    project.equipment.push({ id: uid("eq"), name: data.name, quantity: Number(data.quantity), pricePerUnit: Number(data.pricePerUnit), rentalDays: Number(data.rentalDays) });
    saveState();
    openProjectDetails(projectId);
  });
  bindExpenseForm("project-expense-form", projectId, () => openProjectDetails(projectId));
  const fileForm = byId("project-file-form");
  if (fileForm) fileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = form.querySelector("[name='title']").files[0];
    project.files.push({ id: uid("fl"), category: data.get("category"), title: file?.name || "Документ без имени", url: "#", date: new Date().toISOString().slice(0, 10) });
    saveState();
    openProjectDetails(projectId);
  });
  renderChat(byId("project-chat"), project.chat || [], (text) => {
    project.chat.push({ author: "Николай", role: "Режиссёр", time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }), text });
    saveState();
    openProjectDetails(projectId);
  });
}
function openProjectForm(id = null) {
  const project = id ? projectById(id) : null;
  const selected = new Set(project?.performers || []);
  const coordinates = project?.coordinates || [55.7558, 37.6176];
  projectLocationMap = null;
  projectLocationMarker = null;
  openModal(project ? "Редактировать проект" : "Создать проект", `
    <form id="project-form" class="form-grid">
      ${input("title", "Название", "text", true, project?.title)}
      ${input("client", "Клиент", "text", true, project?.client)}
      <div class="form-row"><label>Статус</label><select name="status" class="select"><option ${project?.status === "Планирование" ? "selected" : ""}>Планирование</option><option ${project?.status === "В работе" ? "selected" : ""}>В работе</option><option ${project?.status === "Монтаж" ? "selected" : ""}>Монтаж</option><option ${project?.status === "Завершён" ? "selected" : ""}>Завершён</option></select></div>
      ${input("clientPayment", "Оплата клиента", "number", true, project?.clientPayment)}
      ${input("startDate", "Дата начала", "date", true, project?.startDate)}
      ${input("draftDeadline", "Дедлайн черновика", "date", true, project?.draftDeadline)}
      ${input("finalDeadline", "Дедлайн чистовика", "date", true, project?.finalDeadline)}
      ${input("shootingStart", "Начало съёмки", "date", true, project?.shootingDates?.[0]?.start)}
      ${input("shootingEnd", "Конец съёмки", "date", true, project?.shootingDates?.[0]?.end)}
      <div class="form-row form-row--wide">
        <label>Место съёмки</label>
        <div class="chat__form">
          <input name="location" id="project-location-title" class="input" type="text" value="${project?.location || ""}" placeholder="Выберите точку на карте или введите адрес" required>
          <button class="btn" type="button" id="toggle-location-map">Выбрать на карте</button>
        </div>
        <input name="lat" id="project-location-lat" type="hidden" value="${coordinates[0]}">
        <input name="lng" id="project-location-lng" type="hidden" value="${coordinates[1]}">
      </div>
      <div id="project-location-picker" class="project-location-picker">
        <p class="small">Кликните по карте, чтобы поставить точку съёмки. Координаты сохранятся в проекте и автоматически попадут на страницу «Карта».</p>
        <div id="project-location-map" class="project-location-map"></div>
      </div>
      <div class="form-row form-row--wide"><label>Исполнители из базы</label><select name="performers" class="select" multiple size="5">${state.performers.map((p) => `<option value="${p.id}" ${selected.has(p.id) ? "selected" : ""}>${p.name} · ${p.role} · ${formatMoney(p.rate)} · ${p.status}</option>`).join("")}</select><p class="small">Используется множественный выбор. Для backend это массив performerId.</p></div>
      <div class="form-row form-row--wide"><label>Описание</label><textarea name="description" class="textarea" required>${project?.description || ""}</textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить</button><button class="btn" type="button" data-close-modal>Отменить</button></div>
    </form>`, { wide: true });
  bindProjectLocationPicker(coordinates, project?.location || "");
  byId("project-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const performers = [...form.querySelector("[name='performers']").selectedOptions].map((option) => option.value);
    const next = {
      id: project?.id || uid("pr"),
      title: data.title,
      client: data.client,
      description: data.description,
      status: data.status,
      startDate: data.startDate,
      draftDeadline: data.draftDeadline,
      finalDeadline: data.finalDeadline,
      shootingDates: [{ start: data.shootingStart, end: data.shootingEnd }],
      location: data.location,
      coordinates: [Number(data.lat), Number(data.lng)],
      performers,
      clientPayment: Number(data.clientPayment),
      expenses: project?.expenses || [],
      equipment: project?.equipment || [],
      files: project?.files || [],
      chat: project?.chat || []
    };
    if (project) state.projects[state.projects.findIndex((item) => item.id === project.id)] = next;
    else state.projects.push(next);
    saveState();
    closeModal();
    rerenderCurrentPage();
  });
}
function bindProjectLocationPicker(initialCoordinates, initialLocation) {
  const toggle = byId("toggle-location-map");
  const picker = byId("project-location-picker");
  const latInput = byId("project-location-lat");
  const lngInput = byId("project-location-lng");
  const titleInput = byId("project-location-title");
  if (!toggle || !picker) return;

  const setLocation = async (latlng) => {
    const lat = Number(latlng.lat).toFixed(6);
    const lng = Number(latlng.lng).toFixed(6);
    latInput.value = lat;
    lngInput.value = lng;
    titleInput.value = "Определяем адрес...";
    if (projectLocationMarker) {
      projectLocationMarker.setLatLng(latlng);
    }
    const address = await reverseGeocode(lat, lng);
    titleInput.value = address || `Точка на карте: ${lat}, ${lng}`;
  };

  toggle.addEventListener("click", () => {
    picker.classList.toggle("is-open");
    if (!picker.classList.contains("is-open")) return;
    window.setTimeout(() => {
      if (!window.L) {
        picker.insertAdjacentHTML("afterbegin", `<div class="empty">Карта не загрузилась. Проверьте подключение Leaflet.</div>`);
        return;
      }
      if (!projectLocationMap) {
        projectLocationMap = L.map("project-location-map").setView(initialCoordinates, 12);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap &copy; CARTO" }).addTo(projectLocationMap);
        projectLocationMarker = L.marker(initialCoordinates, {
          icon: L.divIcon({
            className: "shooting-pin",
            html: `<span class="shooting-pin__body"></span><span class="shooting-pin__shadow"></span>`,
            iconSize: [16, 22],
            iconAnchor: [8, 20],
            popupAnchor: [0, -20]
          })
        }).addTo(projectLocationMap);
        projectLocationMap.on("click", (event) => setLocation(event.latlng));
      }
      projectLocationMap.invalidateSize();
      projectLocationMap.setView([Number(latInput.value), Number(lngInput.value)], 12);
      projectLocationMarker.setLatLng([Number(latInput.value), Number(lngInput.value)]);
    }, 120);
  });
}
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ru`);
    const data = await response.json();
    if (!data) return "";
    if (data.address) {
      const address = data.address;
      const parts = [
        address.road || address.pedestrian || address.footway || address.neighbourhood || address.suburb,
        address.house_number,
        address.city || address.town || address.village || address.municipality,
        address.state
      ].filter(Boolean);
      if (parts.length) return parts.join(", ");
    }
    return data.display_name ? data.display_name.split(",").slice(0, 4).join(",") : "";
  } catch (error) {
    return "";
  }
}
function resetProjectFilters() {
  ["project-search", "project-status", "project-performer"].forEach((id) => { if (byId(id)) byId(id).value = ""; });
  if (byId("project-sort")) byId("project-sort").value = "deadline";
  renderProjectCards();
}
function archiveProject(id) {
  const project = projectById(id);
  if (!project) return;
  project.status = "Завершён";
  project.archivedAt = localISODate();
  saveState();
  closeModal();
  projectView = "archive";
  rerenderCurrentPage();
}
function restoreProject(id) {
  const project = projectById(id);
  if (!project) return;
  project.status = "В работе";
  delete project.archivedAt;
  saveState();
  closeModal();
  projectView = "active";
  rerenderCurrentPage();
}

function renderFinancesPage() {
  const total = totals();
  renderKpis(byId("finance-kpis"), [
    { label: "Общий доход", value: formatMoney(total.income), meta: "Из оплат клиентов" },
    { label: "Общие расходы", value: formatMoney(total.expenses), meta: "Проекты, аренда, общие траты" },
    { label: "Чистая прибыль", value: formatMoney(total.profit), meta: "После всех расходов" },
    { label: "Документы", value: state.documents.length, meta: "Чеки, счета, PDF, Мой налог" }
  ]);
  document.querySelectorAll("[data-finance-tab]").forEach((btn) => btn.addEventListener("click", () => {
    financeTab = btn.dataset.financeTab;
    document.querySelectorAll("[data-finance-tab]").forEach((el) => el.classList.toggle("active", el === btn));
    renderFinanceTab();
  }));
  renderFinanceCharts();
  renderFinanceTab();
}
function renderFinanceTab() {
  const root = byId("finance-tab-content");
  if (financeTab === "projects") {
    root.innerHTML = table(["Проект", "Клиент", "Доход", "Расходы", "Прибыль", "Маржа"], state.projects.map((p) => [p.title, p.client, formatMoney(p.clientPayment), formatMoney(projectExpenses(p)), formatMoney(p.profit), `${Math.round(p.profit / p.clientPayment * 100)}%`]));
  }
  if (financeTab === "expenses") {
    root.innerHTML = `<div class="section-head"><h2 class="section-title">Расходы</h2><button class="btn btn--green" data-action="open-expense-create">Добавить трату</button></div>` + table(["Тип", "Проект", "Категория", "Название", "Сумма", "Дата", "Чек"], allExpenses().map((e) => [e.type === "general" ? "Общая" : "Проект", projectById(e.projectId)?.title || "Без проекта", e.category, e.title, formatMoney(e.amount), formatDate(e.date), e.receiptFile || "Нет"]));
  }
  if (financeTab === "documents") {
    root.innerHTML = table(["Тип", "Проект", "Название", "Сумма", "Дата", "PDF/чек", "Мой налог"], state.documents.map((d) => [d.type, projectById(d.projectId)?.title || "Без проекта", d.title, formatMoney(d.amount), formatDate(d.date), d.pdfFile || d.receiptFile || "Нет", d.myTaxLink ? `<a href="${d.myTaxLink}" target="_blank">Открыть</a>` : "Нет"]));
  }
}
function renderFinanceCharts() {
  if (!window.Chart) return;
  Object.values(financeCharts).forEach((chart) => chart.destroy());
  financeCharts = {};
  const months = ["Май", "Июнь"];
  const income = [totals().income, Math.round(totals().income * .72)];
  const expenses = [totals().expenses, Math.round(totals().expenses * .58)];
  financeCharts.line = new Chart(byId("finance-line"), { type: "line", data: { labels: months, datasets: [{ label: "Доходы", data: income, borderColor: "#191a23", backgroundColor: "rgba(185,255,102,.35)" }, { label: "Расходы", data: expenses, borderColor: "#ef5350", backgroundColor: "rgba(239,83,80,.16)" }] }, options: { responsive: true, maintainAspectRatio: false } });
  const byCategory = groupByAmount(allExpenses(), "category");
  financeCharts.pie = new Chart(byId("finance-pie"), { type: "doughnut", data: { labels: Object.keys(byCategory), datasets: [{ data: Object.values(byCategory), backgroundColor: ["#b9ff66", "#191a23", "#3975d6", "#ef5350", "#f2b84b", "#26a69a", "#d8ffad"] }] }, options: { responsive: true, maintainAspectRatio: false } });
}
function openExpenseForm(projectId = "") {
  openModal("Добавить трату", expenseFormHtml("expense-form", projectId, true), { note: "Расход можно связать с проектом или оставить общей тратой.", wide: true });
  bindExpenseForm("expense-form", projectId, () => { closeModal(); rerenderCurrentPage(); });
}
function expenseFormHtml(formId, projectId = "", withProjectSelect = false) {
  return `
    <form id="${formId}" class="form-grid" style="margin-top:12px">
      ${withProjectSelect ? `<div class="form-row"><label>Проект</label><select name="projectId" class="select"><option value="">Общая трата</option>${state.projects.map((p) => `<option value="${p.id}" ${p.id === projectId ? "selected" : ""}>${p.title}</option>`).join("")}</select></div>` : `<input type="hidden" name="projectId" value="${projectId}">`}
      <div class="form-row"><label>Категория</label><select name="category" class="select">${expenseCategories.map((c) => `<option>${c}</option>`).join("")}</select></div>
      <div class="form-row"><label>Типовая трата</label><select name="typical" class="select">${typicalExpenses.map((c) => `<option>${c}</option>`).join("")}</select></div>
      ${input("title", "Своя трата / название", "text", true)}
      ${input("amount", "Сумма", "number", true)}
      ${input("date", "Дата", "date", true, localISODate())}
      <div class="form-row"><label>Чек / документ</label><input name="receiptFile" class="input" type="file"></div>
      <div class="form-row form-row--wide"><label>Комментарий</label><textarea name="comment" class="textarea"></textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить трату</button></div>
    </form>`;
}
function bindExpenseForm(formId, fixedProjectId, afterSave) {
  const form = byId(formId);
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const file = form.querySelector("[name='receiptFile']")?.files[0];
    const expense = { id: uid("ex"), projectId: data.projectId || null, category: data.category, title: data.title || data.typical, amount: Number(data.amount), date: data.date, comment: data.comment, receiptFile: file?.name || "", type: data.projectId ? "project" : "general" };
    if (expense.projectId) projectById(expense.projectId).expenses.push(expense);
    else state.generalExpenses.push(expense);
    if (expense.receiptFile) state.documents.push({ id: uid("doc"), projectId: expense.projectId, type: "Чек", title: expense.title, amount: expense.amount, date: expense.date, pdfFile: "", receiptFile: expense.receiptFile, myTaxLink: "", comment: expense.comment });
    saveState();
    afterSave();
  });
}

function renderCalendarPage() {
  byId("calendar-view").value = calendarView;
  byId("calendar-project").innerHTML = `<option value="">Все проекты</option>${state.projects.map((p) => `<option value="${p.id}">${p.title}</option>`).join("")}`;
  byId("calendar-performer").innerHTML = `<option value="">Мой календарь / все исполнители</option>${state.performers.map((p) => `<option value="${p.id}">${p.name} · ${p.role}</option>`).join("")}`;
  byId("calendar-view").addEventListener("change", (e) => { setCalendarView(e.target.value); });
  document.querySelectorAll("[data-calendar-mode]").forEach((button) => {
    button.addEventListener("click", () => setCalendarView(button.dataset.calendarMode));
  });
  byId("calendar-project").addEventListener("change", renderCalendar);
  byId("calendar-performer").addEventListener("change", renderCalendar);
  byId("cal-prev").addEventListener("click", () => shiftCalendar(-1));
  byId("cal-next").addEventListener("click", () => shiftCalendar(1));
  byId("cal-today").addEventListener("click", () => { calendarDate = new Date(); renderCalendar(); });
  renderCalendar();
}
function setCalendarView(view) {
  calendarView = view;
  byId("calendar-view").value = view;
  document.querySelectorAll("[data-calendar-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.calendarMode === view);
  });
  renderCalendar();
}
function calendarEventsWithDeadlines() {
  const projectEvents = state.projects.flatMap((project) => [
    { id: `draft-${project.id}`, title: `Черновик: ${project.title}`, description: "Автоматически из проекта", startDateTime: `${project.draftDeadline}T17:00`, endDateTime: `${project.draftDeadline}T18:00`, projectId: project.id, performerId: "", status: project.status, priority: "Высокий", type: "deadline" },
    { id: `final-${project.id}`, title: `Чистовик: ${project.title}`, description: "Автоматически из проекта", startDateTime: `${project.finalDeadline}T17:00`, endDateTime: `${project.finalDeadline}T18:00`, projectId: project.id, performerId: "", status: project.status, priority: "Высокий", type: "deadline" },
    ...(project.shootingDates || []).map((date) => ({ id: `shoot-${project.id}-${date.start}`, title: `Съёмка: ${project.title}`, description: project.location, startDateTime: `${date.start}T10:00`, endDateTime: `${date.end}T18:00`, projectId: project.id, performerId: project.performers[0] || "", status: project.status, priority: "Высокий", type: "shoot" }))
  ]);
  return [...state.events, ...projectEvents];
}
function renderCalendar() {
  const title = byId("calendar-title");
  const root = byId("calendar-root");
  const events = filteredCalendarEvents();
  if (calendarView === "month") {
    title.textContent = new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(calendarDate);
    root.innerHTML = renderMonth(events);
  } else if (calendarView === "day") {
    title.textContent = formatDate(calendarDate);
    root.innerHTML = renderDaySchedule(calendarDate, events);
  } else {
    const days = weekDates(calendarDate);
    title.textContent = `Неделя ${formatDate(days[0])} - ${formatDate(days[6])}`;
    root.innerHTML = `<div class="timeline">${days.map((day) => dayTimeline(day, events)).join("")}</div>`;
  }
}
function renderMonth(events) {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const iso = localISODate(date);
    const dayEvents = events.filter((event) => event.startDateTime.slice(0, 10) === iso);
    cells.push(`<div class="calendar-cell ${date.getMonth() !== month ? "is-muted" : ""} ${iso === localISODate() ? "is-today" : ""}" data-date="${iso}" onclick="openEventForm('${iso}')"><div class="calendar-date">${date.getDate()}</div>${dayEvents.map(eventChip).join("")}</div>`);
  }
  return `<div class="calendar-board">${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => `<div class="calendar-day-name">${d}</div>`).join("")}${cells.join("")}</div>`;
}
function dayTimeline(day, events) {
  const iso = localISODate(day);
  const dayEvents = events.filter((event) => event.startDateTime.slice(0, 10) === iso).sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
  return `<div class="panel"><div class="section-head"><h3 class="section-title">${formatDate(iso)}</h3><button class="btn btn--green" onclick="openEventForm('${iso}')">Добавить</button></div>${dayEvents.map(eventListItem).join("") || `<div class="empty">Событий нет. Нажмите «Добавить».</div>`}</div>`;
}
function renderDaySchedule(day, events) {
  const iso = localISODate(day);
  const startHour = 8;
  const endHour = 23;
  const hourHeight = 64;
  const dayEvents = events.filter((event) => event.startDateTime.slice(0, 10) === iso).sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
  const hours = Array.from({ length: endHour - startHour }, (_, index) => startHour + index);
  const now = new Date();
  const isToday = iso === localISODate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowTop = ((nowMinutes - startHour * 60) / 60) * hourHeight;
  const nowLine = isToday && nowMinutes >= startHour * 60 && nowMinutes <= endHour * 60
    ? `<div class="day-now-line" data-time="${now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}" style="top:${nowTop}px"></div>`
    : "";
  return `
    <div class="section-head">
      <div>
        <h3 class="section-title">Мой день по часам</h3>
        <p class="section-note">Созвоны, задачи и дедлайны разложены по времени. Красная линия показывает текущее время.</p>
      </div>
      <button class="btn btn--green" onclick="openEventForm('${iso}')">Добавить событие</button>
    </div>
    <div class="day-schedule">
      <div class="day-hours">${hours.map((hour) => `<div class="day-hour-label">${String(hour).padStart(2, "0")}:00</div>`).join("")}</div>
      <div class="day-grid" onclick="openEventForm('${iso}')">
        ${nowLine}
        ${dayEvents.map((event) => dayEventBlock(event, startHour, endHour, hourHeight)).join("")}
      </div>
    </div>`;
}
function dayEventBlock(event, startHour, endHour, hourHeight) {
  const project = projectById(event.projectId);
  const performer = performerById(event.performerId);
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);
  const startMinutes = Math.max(startHour * 60, start.getHours() * 60 + start.getMinutes());
  const endMinutes = Math.min(endHour * 60, end.getHours() * 60 + end.getMinutes());
  const top = ((startMinutes - startHour * 60) / 60) * hourHeight;
  const height = Math.max(38, ((Math.max(endMinutes, startMinutes + 30) - startMinutes) / 60) * hourHeight - 6);
  return `
    <article class="day-event day-event--${event.type}" style="top:${top}px;height:${height}px" onclick="event.stopPropagation(); openEventDetails('${event.id}')">
      <div class="day-event__time">${start.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</div>
      <div class="day-event__title">${event.title}</div>
      <div class="day-event__meta">${project?.title || "Без проекта"} · ${performer?.name || "Без исполнителя"} · ${event.priority}</div>
    </article>`;
}
function eventChip(event) {
  return `<button class="event-chip event-chip--${event.type}" onclick="event.stopPropagation(); openEventDetails('${event.id}')">${event.title}</button>`;
}
function eventListItem(event) {
  const project = projectById(event.projectId);
  const performer = performerById(event.performerId);
  return `<div class="timeline-item clickable" onclick="openEventDetails('${event.id}')"><div class="timeline-time">${formatDateTime(event.startDateTime)}</div><div><strong>${event.title}</strong><p class="list-item__text">${project?.title || "Без проекта"} · ${performer?.name || "Без исполнителя"} · ${event.priority}</p></div></div>`;
}
function filteredCalendarEvents() {
  const projectId = byId("calendar-project")?.value;
  const performerId = byId("calendar-performer")?.value;
  return calendarEventsWithDeadlines().filter((event) => (!projectId || event.projectId === projectId) && (!performerId || event.performerId === performerId || projectById(event.projectId)?.performers.includes(performerId)));
}
function shiftCalendar(direction) {
  const next = new Date(calendarDate);
  if (calendarView === "month") next.setMonth(next.getMonth() + direction);
  if (calendarView === "week") next.setDate(next.getDate() + direction * 7);
  if (calendarView === "day") next.setDate(next.getDate() + direction);
  calendarDate = next;
  renderCalendar();
}
function weekDates(date) {
  const start = new Date(date);
  start.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
}
function openEventDetails(id) {
  const event = calendarEventsWithDeadlines().find((item) => item.id === id);
  openModal(event.title, `<div class="list">
    <div class="list-item"><span>Время</span><strong>${formatDateTime(event.startDateTime)} - ${formatDateTime(event.endDateTime)}</strong></div>
    <div class="list-item"><span>Проект</span><strong>${projectById(event.projectId)?.title || "Без проекта"}</strong></div>
    <div class="list-item"><span>Исполнитель</span><strong>${performerById(event.performerId)?.name || "Не назначен"}</strong></div>
    <div class="list-item"><span>Статус / приоритет</span><strong>${event.status} / ${event.priority}</strong></div>
    <div class="list-item"><span>Описание</span><strong>${event.description || "Нет"}</strong></div>
  </div>`);
}
function openEventForm(date = localISODate()) {
  openModal("Добавить событие", `
    <form id="event-form" class="form-grid">
      ${input("title", "Название задачи", "text", true)}
      <div class="form-row"><label>Проект</label><select name="projectId" class="select"><option value="">Без проекта</option>${state.projects.map((p) => `<option value="${p.id}">${p.title}</option>`).join("")}</select></div>
      <div class="form-row"><label>Исполнитель</label><select name="performerId" class="select"><option value="">Не назначен</option>${state.performers.map((p) => `<option value="${p.id}">${p.name} · ${p.role}</option>`).join("")}</select></div>
      ${input("date", "Дата", "date", true, date)}
      ${input("start", "Начало", "time", true, "10:00")}
      ${input("end", "Окончание", "time", true, "13:00")}
      <div class="form-row"><label>Статус</label><select name="status" class="select"><option>Запланировано</option><option>В работе</option><option>Готово</option></select></div>
      <div class="form-row"><label>Приоритет</label><select name="priority" class="select"><option>Средний</option><option>Высокий</option><option>Низкий</option></select></div>
      <div class="form-row"><label>Тип</label><select name="type" class="select"><option value="task">Задача</option><option value="meeting">Встреча</option><option value="shoot">Съёмка</option><option value="deadline">Дедлайн</option></select></div>
      <div class="form-row form-row--wide"><label>Описание</label><textarea name="description" class="textarea"></textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить событие</button></div>
    </form>`);
  byId("event-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    state.events.push({ id: uid("ev"), title: data.title, description: data.description, startDateTime: `${data.date}T${data.start}`, endDateTime: `${data.date}T${data.end}`, projectId: data.projectId, performerId: data.performerId, status: data.status, priority: data.priority, type: data.type });
    saveState();
    closeModal();
    renderCalendar();
  });
}

function renderMapPage() {
  byId("map-status").innerHTML = `<option value="">Все статусы</option>${[...new Set(state.projects.map((p) => p.status))].map((status) => `<option>${status}</option>`).join("")}`;
  ["map-period", "map-date-start", "map-date-end", "map-status"].forEach((id) => {
    const control = byId(id);
    control.addEventListener("input", renderMapMarkers);
    control.addEventListener("change", renderMapMarkers);
  });
  byId("download-map").addEventListener("click", downloadMapPng);
  window.setTimeout(initMap, 200);
}
function mapPoints() {
  return state.projects.map((project) => {
    const dates = project.shootingDates || [];
    const starts = dates.map((date) => date.start).sort();
    const ends = dates.map((date) => date.end).sort();
    return {
      id: `mp-${project.id}`,
      projectId: project.id,
      title: project.title,
      location: project.location,
      coordinates: project.coordinates,
      shootingDateStart: starts[0],
      shootingDateEnd: ends[ends.length - 1],
      shootingDaysCount: dates.reduce((sum, date) => sum + inclusiveDayCount(date.start, date.end), 0),
      status: project.status,
      client: project.client
    };
  });
}
function inclusiveDayCount(start, end) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end || start}T00:00:00`);
  const diff = Math.round((endDate - startDate) / 86400000);
  return Math.max(1, diff + 1);
}
function mapDateRange() {
  const period = byId("map-period")?.value || "all";
  const today = new Date();
  let start = null;
  let end = null;
  if (period === "day") start = end = localISODate(today);
  if (period === "week") { const days = weekDates(today); start = localISODate(days[0]); end = localISODate(days[6]); }
  if (period === "month") { start = localISODate(new Date(today.getFullYear(), today.getMonth(), 1)); end = localISODate(new Date(today.getFullYear(), today.getMonth() + 1, 0)); }
  if (period === "custom") { start = byId("map-date-start").value || null; end = byId("map-date-end").value || null; }
  return { start, end };
}
function rangesOverlap(itemStart, itemEnd, filterStart, filterEnd) {
  if (!filterStart && !filterEnd) return true;
  const start = itemStart;
  const end = itemEnd || itemStart;
  return (!filterStart || end >= filterStart) && (!filterEnd || start <= filterEnd);
}
function filteredProjectsForMap() {
  const status = byId("map-status")?.value;
  const { start, end } = mapDateRange();
  return state.projects.filter((project) => {
    const statusOk = !status || project.status === status;
    const dateOk = (project.shootingDates || []).some((date) => rangesOverlap(date.start, date.end, start, end));
    return statusOk && dateOk;
  });
}
function shootingHeatSource() {
  const grouped = new Map();
  filteredProjectsForMap().forEach((project) => {
    (project.shootingDates || []).forEach((date) => {
      const { start, end } = mapDateRange();
      if (!rangesOverlap(date.start, date.end, start, end)) return;
      const lat = Number(project.coordinates?.[0]);
      const lng = Number(project.coordinates?.[1]);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      const current = grouped.get(key) || { lat, lng, weight: 0 };
      current.weight += inclusiveDayCount(date.start, date.end);
      grouped.set(key, current);
    });
  });
  return [...grouped.values()];
}
function filteredMapPoints() {
  const allowedProjectIds = new Set(filteredProjectsForMap().map((project) => project.id));
  return mapPoints().filter((point) => allowedProjectIds.has(point.projectId));
}
function initMap() {
  if (!window.L) {
    byId("shooting-map").innerHTML = `<div class="empty">Leaflet не загрузился. Проверьте интернет или подключите библиотеку локально.</div>`;
    return;
  }
  leafletMap = L.map("shooting-map").setView([56.4, 35.6], 5);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap &copy; CARTO" }).addTo(leafletMap);
  leafletMap.on("zoomend", updateMapMarkerVisibility);
  renderMapMarkers();
}
function renderMapMarkers() {
  if (!leafletMap) return;
  leafletMap.closePopup();
  mapLayers.forEach((layer) => leafletMap.removeLayer(layer));
  mapLayers = [];
  if (mapHeatLayer) {
    leafletMap.removeLayer(mapHeatLayer);
    mapHeatLayer = null;
  }
  const points = filteredMapPoints();
  const bounds = [];
  const heatPoints = shootingHeatSource();
  const maxHeat = Math.max(1, ...heatPoints.map((point) => point.weight));
  const heatSource = heatPoints.map((point) => [point.lat, point.lng, point.weight]);
  if (window.L.heatLayer && heatSource.length) {
    mapHeatLayer = L.heatLayer(heatSource, {
      radius: 38,
      blur: 24,
      max: maxHeat,
      maxZoom: 17,
      minOpacity: .22,
      gradient: { 0.2: "#B9FF66", 0.5: "#7acc00", 0.8: "#3d7a00", 1.0: "#191A23" }
    }).addTo(leafletMap);
  }
  points.forEach((point) => {
    const marker = L.marker(point.coordinates, {
      icon: L.divIcon({
        className: "shooting-pin",
        html: `<span class="shooting-pin__body"></span><span class="shooting-pin__shadow"></span>`,
        iconSize: [16, 22],
        iconAnchor: [8, 20],
        popupAnchor: [0, -20]
      })
    }).addTo(leafletMap);
    marker.bindPopup(`<strong>${point.title}</strong><br>${point.location}<br>${point.client}<br>${formatDate(point.shootingDateStart)} - ${formatDate(point.shootingDateEnd)}<br>Съёмочных дней: ${point.shootingDaysCount}<br>${point.status}`);
    if (!window.L.heatLayer) {
      const fallbackHeat = L.circle(point.coordinates, { radius: 1200 + point.shootingDaysCount * 400, color: "#b9ff66", fillColor: "#b9ff66", fillOpacity: Math.min(.28, .1 + point.shootingDaysCount * .04), weight: 1 }).addTo(leafletMap);
      mapLayers.push(fallbackHeat);
    }
    mapLayers.push(marker);
    bounds.push(point.coordinates);
  });
  if (bounds.length) leafletMap.fitBounds(bounds, { padding: [40, 40] });
  updateMapMarkerVisibility();
  byId("map-list").innerHTML = points.map((point) => `<article class="card clickable" onclick="openProjectDetails('${point.projectId}')"><h3 class="entity-name">${point.title}</h3><p class="entity-meta">${point.client} · ${point.location}</p><div class="list-item" style="margin-top:12px"><span>${formatDate(point.shootingDateStart)} - ${formatDate(point.shootingDateEnd)}</span><strong>${point.shootingDaysCount} съём. дн.</strong></div><div class="list-item" style="margin-top:8px"><span>Статус</span><strong>${point.status}</strong></div></article>`).join("") || `<div class="empty">Нет точек за выбранный период.</div>`;
}
function updateMapMarkerVisibility() {
  if (!leafletMap) return;
  const visible = leafletMap.getZoom() >= markerVisibleZoom;
  mapLayers.forEach((layer) => {
    if (layer instanceof L.Marker) {
      layer.setOpacity(visible ? 1 : 0);
    }
  });
}
function downloadMapPng() {
  const node = byId("shooting-map");
  if (!window.html2canvas) return alert("html2canvas не загрузился.");
  node.classList.add("is-exporting");
  leafletMap?.closePopup();
  window.setTimeout(() => {
    html2canvas(node, { useCORS: true, backgroundColor: "#ffffff" }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "shooting-map.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }).finally(() => {
      node.classList.remove("is-exporting");
    });
  }, 80);
}

function input(name, label, type = "text", required = false, value = "") {
  return `<div class="form-row"><label>${label}</label><input name="${name}" class="input" type="${type}" value="${value ?? ""}" ${required ? "required" : ""}></div>`;
}
function renderChat(root, messages, onSend) {
  if (!root) return;
  root.innerHTML = `
    <div class="chat__messages">${messages.map((msg) => `<div class="message"><div class="message__head"><span><span class="message__author">${msg.author}</span> · ${msg.role}</span><span>${msg.time}</span></div><div>${escapeHtml(msg.text)}</div></div>`).join("")}</div>
    <form class="chat__form"><input class="input" name="message" placeholder="Написать сообщение"><button class="btn btn--green">Отправить</button></form>`;
  root.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const inputEl = event.currentTarget.elements.message;
    onSend(inputEl.value);
    inputEl.value = "";
  });
}
function table(headers, rows) {
  return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function groupByAmount(items, field) {
  return items.reduce((acc, item) => {
    acc[item[field]] = (acc[item[field]] || 0) + Number(item.amount || 0);
    return acc;
  }, {});
}
function upcomingProjectDeadlines() {
  const now = new Date();
  const until = new Date();
  until.setDate(now.getDate() + 14);
  return state.projects.flatMap((p) => [p.draftDeadline, p.finalDeadline]).filter((date) => new Date(date) >= now && new Date(date) <= until);
}
function exportDataset(type) {
  hydrateDerivedData();
  const datasets = {
    performers: state.performers,
    projects: state.projects.map((p) => ({ ...p, performers: p.performers.map((id) => performerById(id)?.name).join(", "), expensesTotal: projectExpenses(p), profit: p.profit, margin: p.clientPayment ? Math.round(p.profit / p.clientPayment * 100) : 0 })),
    finances: state.projects.map((p) => ({ project: p.title, client: p.client, income: p.clientPayment, expenses: projectExpenses(p), profit: p.profit })),
    expenses: allExpenses().map((e) => ({ ...e, project: projectById(e.projectId)?.title || "Без проекта" })),
    documents: state.documents.map((d) => ({ ...d, project: projectById(d.projectId)?.title || "Без проекта" })),
    equipment: state.projects.flatMap((p) => (p.equipment || []).map((e) => ({ project: p.title, ...e }))),
    map: mapPoints()
  };
  const data = datasets[type] || [];
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type);
    XLSX.writeFile(workbook, `${type}.xlsx`);
    return;
  }
  const csv = [Object.keys(data[0] || {}).join(";"), ...data.map((row) => Object.values(row).join(";"))].join("\n");
  const link = document.createElement("a");
  link.download = `${type}.csv`;
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.click();
}
function rerenderCurrentPage() {
  const page = document.body.dataset.page;
  if (page === "dashboard") renderDashboard();
  if (page === "performers") renderPerformersPage();
  if (page === "projects") renderProjectsPage();
  if (page === "finances") renderFinancesPage();
  if (page === "calendar") renderCalendar();
  if (page === "map") renderMapMarkers();
}

window.openPerformerDetails = openPerformerDetails;
window.openProjectDetails = openProjectDetails;
window.openProjectForm = openProjectForm;
window.archiveProject = archiveProject;
window.restoreProject = restoreProject;
window.openEventForm = openEventForm;
window.openEventDetails = openEventDetails;
