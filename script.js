const API_READY_DATA_MODEL = {
  Performer: "id, name, role, email, password, rate, activeProjectsCount, completedProjectsCount, nearestDeadline, status, contacts, notes",
  Project: "id, title, client, description, status, startDate, draftDeadline, finalDeadline, shootingDates, location, coordinates, performers, clientPayment, payments, expenses, equipment, files, chat, profit",
  Expense: "id, projectId|null, category, title, amount, date, paidAt, paymentMethod, comment, receiptFile, type",
  EquipmentItem: "id, name, category, quantity, pricePerUnit, rentalDays, receiptFile, totalPrice",
  CalendarEvent: "id, title, description, startDateTime, endDateTime, allDay, projectId, performerId, status, priority, type",
  FinanceDocument: "id, projectId|null, type, title, amount, date, pdfFile, receiptFile, myTaxLink, comment",
  MapPoint: "id, projectId, title, location, coordinates, shootingDateStart, shootingDateEnd, status"
};

const storeKey = "voskresenskyProductionSystem.v2";
const expenseCategories = ["Аренда оборудования", "Транспорт", "Монтаж", "Цветокоррекция", "Звук", "Музыка", "Реквизит", "Локация", "Питание", "Подписки", "Офис", "Реклама", "Прочее"];
const paymentMethods = ["Перевод", "Наличные", "Работа по ИП", "Самозанятость", "Карта"];
const fileCategories = ["Чек", "Видео", "ТЗ", "Сценарий", "Счёт", "Акт", "PDF", "Документ"];
const expenseTemplateCatalog = {
  "Аренда оборудования": ["Камера Sony FX6", "Камера Sony A7S III", "Комплект света Aputure", "DJI RS 4 Pro", "Набор петличек"],
  "Транспорт": ["Такси на площадку", "Грузовой каршеринг", "Трансфер команды"],
  "Монтаж": ["Монтаж черновика", "Финальный монтаж", "Адаптация под reels"],
  "Цветокоррекция": ["Цветокоррекция выпуска", "LUT и тестовый проход"],
  "Звук": ["Запись интервью", "Чистка звука", "Сведение"],
  "Музыка": ["Музыкальная лицензия", "Подбор музыки"],
  "Реквизит": ["Покупка реквизита", "Аренда реквизита"],
  "Локация": ["Аренда студии", "Аренда площадки", "Согласование площадки"],
  "Питание": ["Кейтеринг", "Кофе и вода", "Обед команде"],
  "Подписки": ["Музыкальная библиотека", "Frame.io", "Dropbox"],
  "Офис": ["Коворкинг", "Интернет", "Печать документов"],
  "Реклама": ["Таргет", "Продвижение кейса", "Реклама в соцсетях"],
  "Прочее": ["PDF-счёт", "Самозанятый чек", "Своя трата"]
};
const defaultEquipmentPresets = [
  { name: "Sony FX6", category: "Камера", pricePerUnit: 9000 },
  { name: "Sony A7S III", category: "Камера", pricePerUnit: 6500 },
  { name: "Комплект света Aputure", category: "Свет", pricePerUnit: 3500 },
  { name: "DJI RS 4 Pro", category: "Стабилизация", pricePerUnit: 4500 },
  { name: "Zoom F6", category: "Звук", pricePerUnit: 2800 },
  { name: "Sennheiser EW-DP", category: "Звук", pricePerUnit: 2500 }
];
const equipmentCategories = ["Камера", "Свет", "Звук", "Стабилизация", "Объективы", "Другое"];

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
      payments: [
        { id: "pay-1", date: "2026-05-18", amount: 210000, method: "Перевод", comment: "Предоплата 50%" },
        { id: "pay-2", date: "2026-06-04", amount: 210000, method: "Работа по ИП", comment: "Финальный платёж после сдачи" }
      ],
      expenses: [
        { id: "ex-1", projectId: "pr-1", category: "Монтаж", title: "Монтаж черновика", amount: 48000, date: "2026-05-24", paidAt: "2026-05-25", paymentMethod: "Перевод", comment: "Первая версия для клиента", receiptFile: "edit-invoice.pdf", type: "project" },
        { id: "ex-2", projectId: "pr-1", category: "Транспорт", title: "Логистика команды", amount: 9500, date: "2026-05-21", paidAt: "2026-05-21", paymentMethod: "Карта", comment: "Такси и грузовой каршеринг", receiptFile: "transport-check.pdf", type: "project" },
        { id: "ex-2b", projectId: "pr-1", category: "Подписки", title: "Frame.io на проект", amount: 3200, date: "2026-05-19", paidAt: "2026-05-19", paymentMethod: "Карта", comment: "Доступ для клиента и команды", receiptFile: "frameio-veka.pdf", type: "project" }
      ],
      equipment: [
        { id: "eq-1", name: "Sony FX6", category: "Камера", quantity: 1, pricePerUnit: 9000, rentalDays: 2, receiptFile: "fx6-rent.pdf" },
        { id: "eq-2", name: "Комплект света Aputure", category: "Свет", quantity: 2, pricePerUnit: 3500, rentalDays: 2, receiptFile: "aputure-rent.pdf" }
      ],
      files: [
        { id: "fl-1", category: "ТЗ", title: "brief-veka.pdf", url: "#", date: "2026-05-18", note: "Техническое задание от клиента" },
        { id: "fl-2", category: "Чек", title: "transport-check.pdf", url: "#", date: "2026-05-21", note: "Логистика команды" },
        { id: "fl-3a", category: "Счёт", title: "invoice-veka-50.pdf", url: "#", date: "2026-05-18", note: "Предоплата" }
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
      payments: [
        { id: "pay-3", date: "2026-05-24", amount: 140000, method: "Перевод", comment: "Аванс на препрод" }
      ],
      expenses: [
        { id: "ex-3", projectId: "pr-2", category: "Музыка", title: "Лицензия на трек", amount: 12000, date: "2026-05-24", paidAt: "2026-05-24", paymentMethod: "Карта", comment: "Коммерческое использование", receiptFile: "music-license.pdf", type: "project" }
      ],
      equipment: [
        { id: "eq-3", name: "DJI RS 4 Pro", category: "Стабилизация", quantity: 1, pricePerUnit: 4500, rentalDays: 1, receiptFile: "" }
      ],
      files: [{ id: "fl-3", category: "Сценарий", title: "startupx-script.docx", url: "#", date: "2026-05-23", note: "Основной сценарий продукта" }],
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
      payments: [
        { id: "pay-4", date: "2026-05-11", amount: 190000, method: "Наличные", comment: "Оплата одной суммой" }
      ],
      expenses: [
        { id: "ex-4", projectId: "pr-3", category: "Цветокоррекция", title: "Цвет выпуска", amount: 26000, date: "2026-05-22", paidAt: "2026-05-23", paymentMethod: "Перевод", comment: "DaVinci project", receiptFile: "color.pdf", type: "project" },
        { id: "ex-5", projectId: "pr-3", category: "Питание", title: "Питание на площадке", amount: 7800, date: "2026-05-12", paidAt: "2026-05-12", paymentMethod: "Наличные", comment: "Команда 6 человек", receiptFile: "food.pdf", type: "project" }
      ],
      equipment: [],
      files: [{ id: "fl-4", category: "Видео", title: "episode3-preview.mp4", url: "#", date: "2026-05-22", note: "Черновой экспорт для согласования" }],
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
    { id: "ev-day-1", title: "Напомнить клиенту про акт и финальный счёт", description: "Проверить документы по VEKA до конца дня", startDateTime: "2026-05-23T00:00", endDateTime: "2026-05-23T23:59", allDay: true, projectId: "pr-1", performerId: "pf-4", status: "Запланировано", priority: "Высокий", type: "task" },
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
let financeChartPeriod = "6m";
let financeCategoryFilter = "";
let modalBackAction = null;
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
  nextState.generalExpenses = nextState.generalExpenses || [];
  nextState.documents = nextState.documents || [];
  nextState.catalogs = nextState.catalogs || {};
  nextState.catalogs.expenseTemplates = mergeExpenseTemplateCatalog(nextState.catalogs.expenseTemplates);
  nextState.catalogs.equipmentPresets = mergeEquipmentPresets(nextState.catalogs.equipmentPresets);
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
  nextState.events = nextState.events.map((event) => ({
    ...event,
    allDay: Boolean(event.allDay)
  }));
  nextState.projects.forEach((project) => {
    project.payments = normalizeProjectPayments(project);
    project.expenses = (project.expenses || []).map(normalizeExpense);
    project.equipment = (project.equipment || []).map(normalizeEquipmentItem);
    project.files = (project.files || []).map(normalizeProjectFile);
    if (project.status === "Завершён" && !project.archivedAt) {
      project.archivedAt = project.finalDeadline || project.startDate || localISODate();
    }
  });
  nextState.generalExpenses = nextState.generalExpenses.map(normalizeExpense);
  nextState.documents = nextState.documents.map(normalizeDocument);
  localStorage.setItem(storeKey, JSON.stringify(nextState));
  return nextState;
}
function mergeExpenseTemplateCatalog(existing = {}) {
  return expenseCategories.reduce((acc, category) => {
    acc[category] = [...new Set([...(expenseTemplateCatalog[category] || []), ...(existing[category] || [])])];
    return acc;
  }, {});
}
function mergeEquipmentPresets(existing = []) {
  const map = new Map();
  [...defaultEquipmentPresets, ...existing].forEach((preset) => {
    if (!preset?.name) return;
    map.set(preset.name.toLowerCase(), {
      name: preset.name,
      category: preset.category || "Другое",
      pricePerUnit: Number(preset.pricePerUnit || 0)
    });
  });
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "ru"));
}
function normalizeProjectPayments(project) {
  if (project.payments?.length) {
    return project.payments.map((payment, index) => ({
      id: payment.id || `pay-${project.id}-${index + 1}`,
      date: payment.date || project.startDate || localISODate(),
      amount: Number(payment.amount || 0),
      method: payment.method || "Перевод",
      comment: payment.comment || ""
    }));
  }
  return [{
    id: `pay-${project.id}-1`,
    date: project.startDate || localISODate(),
    amount: Number(project.clientPayment || 0),
    method: "Перевод",
    comment: "Основная оплата клиента"
  }];
}
function normalizeExpense(expense) {
  return {
    ...expense,
    amount: Number(expense.amount || 0),
    paidAt: expense.paidAt || expense.date || localISODate(),
    paymentMethod: expense.paymentMethod || "Перевод",
    receiptFile: expense.receiptFile || ""
  };
}
function normalizeEquipmentItem(item) {
  return {
    ...item,
    category: item.category || guessEquipmentCategory(item.name),
    quantity: Number(item.quantity || 1),
    pricePerUnit: Number(item.pricePerUnit || 0),
    rentalDays: Number(item.rentalDays || 1),
    receiptFile: item.receiptFile || "",
    totalPrice: Number(item.quantity || 1) * Number(item.pricePerUnit || 0) * Number(item.rentalDays || 1)
  };
}
function normalizeProjectFile(file) {
  const title = file.title || "Документ без имени";
  return {
    ...file,
    title,
    date: file.date || localISODate(),
    note: file.note || "",
    url: file.url && file.url !== "#" ? file.url : buildMockDownloadUrl(title, file.note || "Файл проекта")
  };
}
function normalizeDocument(doc) {
  return {
    ...doc,
    pdfFile: doc.pdfFile || "",
    receiptFile: doc.receiptFile || "",
    myTaxLink: doc.myTaxLink || "",
    comment: doc.comment || ""
  };
}
function todayCalendarSeeds() {
  return [
    { id: "ev-day-1", title: "Напомнить клиенту про акт и финальный счёт", description: "Проверить документы по VEKA до конца дня", startDateTime: "2026-05-23T00:00", endDateTime: "2026-05-23T23:59", allDay: true, projectId: "pr-1", performerId: "pf-4", status: "Запланировано", priority: "Высокий", type: "task" },
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
    project.calendarAssignments = project.calendarAssignments || {};
    project.calendarEventOverrides = project.calendarEventOverrides || {};
    project.payments = normalizeProjectPayments(project);
    project.expenses = (project.expenses || []).map(normalizeExpense);
    project.equipment = (project.equipment || []).map(normalizeEquipmentItem);
    project.files = (project.files || []).map(normalizeProjectFile);
    project.profit = projectIncome(project) - projectExpenses(project);
  });
  state.generalExpenses = (state.generalExpenses || []).map(normalizeExpense);
  state.documents = (state.documents || []).map(normalizeDocument);
  state.performers.forEach((performer) => {
    const related = state.projects.filter((project) => project.performers.includes(performer.id));
    performer.activeProjectsCount = related.filter((project) => project.status !== "Завершён").length;
    performer.completedProjectsCount = performer.completedProjectsCount || 0;
    performer.nearestDeadline = related.map((project) => project.finalDeadline).sort()[0] || performer.nearestDeadline;
  });
}
function allExpenses() {
  return [...state.projects.flatMap((project) => projectExpenseRows(project)), ...(state.generalExpenses || [])];
}
function projectIncome(project) {
  const paymentsTotal = (project.payments || []).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  return paymentsTotal || Number(project.clientPayment || 0);
}
function projectExpenseRows(project) {
  const directExpenses = (project.expenses || []).map((expense) => ({ ...expense, type: expense.type || "project" }));
  const equipmentExpenses = (project.equipment || []).map((item) => ({
    id: `eq-exp-${item.id}`,
    projectId: project.id,
    category: "Аренда оборудования",
    title: item.name,
    amount: Number(item.totalPrice || 0),
    date: project.shootingDates?.[0]?.start || project.startDate || localISODate(),
    paidAt: project.shootingDates?.[0]?.start || project.startDate || localISODate(),
    paymentMethod: "Перевод",
    comment: `${item.category || "Оборудование"} · ${item.quantity} × ${item.rentalDays} дн.`,
    receiptFile: item.receiptFile || "",
    type: "equipment"
  }));
  return [...directExpenses, ...equipmentExpenses];
}
function projectEquipmentTotal(project) {
  return (project.equipment || []).reduce((sum, item) => sum + Number(item.totalPrice || (item.quantity * item.pricePerUnit * item.rentalDays)), 0);
}
function projectExpenses(project) {
  return (project.expenses || []).reduce((sum, expense) => sum + Number(expense.amount), 0) + projectEquipmentTotal(project);
}
function totals() {
  const income = state.projects.reduce((sum, project) => sum + projectIncome(project), 0);
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
function formatTime(value) {
  return new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
function eventTimeLabel(event, options = {}) {
  if (!event) return "";
  if (event.allDay) {
    return options.withDate ? `${formatDate(event.startDateTime.slice(0, 10))} · весь день` : "Весь день";
  }
  const timeRange = `${formatTime(event.startDateTime)} - ${formatTime(event.endDateTime)}`;
  return options.withDate ? `${formatDate(event.startDateTime.slice(0, 10))} · ${timeRange}` : timeRange;
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
function buildMockDownloadUrl(title, note = "") {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(`Voskresensky Production System\nФайл: ${title}\n${note}`)}`;
}
function guessEquipmentCategory(name = "") {
  const lower = name.toLowerCase();
  if (lower.includes("sony") || lower.includes("camera") || lower.includes("камера")) return "Камера";
  if (lower.includes("light") || lower.includes("aputure") || lower.includes("свет")) return "Свет";
  if (lower.includes("zoom") || lower.includes("sennheiser") || lower.includes("sound") || lower.includes("звук")) return "Звук";
  if (lower.includes("dji") || lower.includes("gimbal") || lower.includes("стед") || lower.includes("стаб")) return "Стабилизация";
  if (lower.includes("lens") || lower.includes("объектив")) return "Объективы";
  return "Другое";
}
function getExpenseTemplates(category) {
  return state.catalogs?.expenseTemplates?.[category] || expenseTemplateCatalog[category] || [];
}
function rememberExpenseTemplate(category, title) {
  const cleanTitle = String(title || "").trim();
  if (!category || !cleanTitle) return;
  state.catalogs.expenseTemplates = state.catalogs.expenseTemplates || mergeExpenseTemplateCatalog();
  const items = new Set(getExpenseTemplates(category));
  items.add(cleanTitle);
  state.catalogs.expenseTemplates[category] = [...items].sort((a, b) => a.localeCompare(b, "ru"));
}
function equipmentPresets() {
  return state.catalogs?.equipmentPresets || defaultEquipmentPresets;
}
function equipmentPresetByName(name) {
  return equipmentPresets().find((preset) => preset.name.toLowerCase() === String(name || "").trim().toLowerCase());
}
function rememberEquipmentPreset(name, category, pricePerUnit) {
  const cleanName = String(name || "").trim();
  if (!cleanName) return;
  const map = new Map(equipmentPresets().map((preset) => [preset.name.toLowerCase(), preset]));
  map.set(cleanName.toLowerCase(), { name: cleanName, category: category || guessEquipmentCategory(cleanName), pricePerUnit: Number(pricePerUnit || 0) });
  state.catalogs.equipmentPresets = [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "ru"));
}
function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
function editIconButton(onclick, label = "Редактировать") {
  return `<button class="icon-btn" type="button" title="${label}" aria-label="${label}" onclick="${onclick}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.7L19.4 9.3a2.1 2.1 0 0 0 0-3l-1.7-1.7a2.1 2.1 0 0 0-3 0L4 15.3V20Zm11.2-14 2.8 2.8M13.9 7.3l2.8 2.8"/></svg>
  </button>`;
}

function bindGlobalActions() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action], [data-export], [data-close-modal], [data-modal-back]");
    if (!target) return;
    if (target.dataset.closeModal !== undefined) closeModal();
    if (target.dataset.modalBack !== undefined) goBackModal();
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
  modalBackAction = typeof options.backAction === "function" ? options.backAction : null;
  modal.innerHTML = `
    <div class="modal__content ${options.wide ? "modal__content--wide" : ""}">
      <div class="modal__head">
        <div class="modal__head-main">
          ${modalBackAction ? `<button class="modal-back-btn" type="button" data-modal-back>${options.backLabel || "Назад"}</button>` : ""}
          <div>
          <h2 class="modal__title">${title}</h2>
          ${options.note ? `<p class="section-note">${options.note}</p>` : ""}
          </div>
        </div>
        <button class="close-btn" data-close-modal aria-label="Закрыть">×</button>
      </div>
      ${body}
    </div>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  if (options.scrollTop !== undefined) {
    requestAnimationFrame(() => {
      const content = modal.querySelector(".modal__content");
      if (content) content.scrollTop = options.scrollTop;
    });
  }
}
function closeModal() {
  const modal = byId("app-modal");
  if (!modal) return;
  modalBackAction = null;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modal.innerHTML = "";
}
function goBackModal() {
  if (typeof modalBackAction === "function") {
    const action = modalBackAction;
    modalBackAction = null;
    action();
    return;
  }
  closeModal();
}
function currentModalScrollTop() {
  return document.querySelector("#app-modal .modal__content")?.scrollTop || 0;
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
  roleSelect.innerHTML = `<option value="">Все роли</option>${performerRoleOptions().map((role) => `<option>${role}</option>`).join("")}`;
  ["performer-search", "performer-role", "performer-status", "performer-sort"].forEach((id) => byId(id).addEventListener("input", renderPerformerCards));
  renderPerformerCards();
}
function performerRoleOptions() {
  return [...new Set(state.performers.map((performer) => performer.role).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ru"));
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
function openPerformerDetails(id, options = {}) {
  const p = performerById(id);
  const projects = state.projects.filter((project) => project.performers.includes(id));
  openModal(p.name, `
    <div class="tabs">
      <button class="tab active">Карточка исполнителя</button>
      ${editIconButton(`openPerformerForm('${p.id}', ${currentModalScrollTop()})`)}
    </div>
    <div class="grid grid--2">
      <div class="panel">
        <p><strong>Роль:</strong> ${p.role}</p><p><strong>Email:</strong> ${p.email}</p><p><strong>Пароль для выдачи:</strong> ${p.password}</p>
        <p><strong>Ставка:</strong> ${formatMoney(p.rate)}</p><p><strong>Контакты:</strong> ${p.contacts}</p><p><strong>Заметка:</strong> ${p.notes || "Нет"}</p>
      </div>
      <div class="panel">
        <h3 class="section-title">Проекты исполнителя</h3>
        <div class="list" style="margin-top:12px">${projects.map((project) => `<div class="list-item"><div><strong>${project.title}</strong><p class="list-item__text">${project.client}</p></div><span class="status">${project.status}</span></div>`).join("") || "Пока нет проектов"}</div>
      </div>
    </div>`, { note: "Подробная карточка готова к привязке к backend/API.", wide: true, scrollTop: options.scrollTop });
}
function openPerformerForm(id = null, sourceScrollTop = null) {
  const performer = id ? performerById(id) : null;
  const roles = performerRoleOptions();
  const performerRole = performer?.role || "";
  const useCustomRole = performerRole && !roles.includes(performerRole);
  const selectedRole = performer ? (useCustomRole ? "__custom__" : performerRole) : (roles[0] || "__custom__");
  openModal(performer ? "Редактировать исполнителя" : "Добавить исполнителя", `
    <form id="performer-form" class="form-grid">
      ${input("name", "Имя", "text", true, performer?.name || "")}
      <div class="form-row">
        <label>Роль</label>
        <select name="roleSelect" id="performer-role-select" class="select" required>
          ${roles.map((role) => `<option value="${escapeHtml(role)}" ${selectedRole === role ? "selected" : ""}>${escapeHtml(role)}</option>`).join("")}
          <option value="__custom__" ${selectedRole === "__custom__" ? "selected" : ""}>Другая роль...</option>
        </select>
      </div>
      <div class="form-row ${selectedRole === "__custom__" ? "" : "hide"}" id="performer-custom-role-row">
        <label>Новая роль</label>
        <input name="customRole" id="performer-custom-role" class="input" type="text" placeholder="Например, режиссёр монтажа" value="${useCustomRole ? escapeHtml(performerRole) : ""}">
      </div>
      ${input("email", "Email", "email", true, performer?.email || "")}
      ${input("password", "Пароль для исполнителя", "text", true, performer?.password || "")}
      ${input("rate", "Ставка", "number", true, performer?.rate || "")}
      ${input("contacts", "Контактные данные", "text", true, performer?.contacts || "")}
      <div class="form-row"><label>Статус</label><select name="status" class="select"><option ${performer?.status === "Свободен" || !performer ? "selected" : ""}>Свободен</option><option ${performer?.status === "Занят" ? "selected" : ""}>Занят</option><option ${performer?.status === "На проекте" ? "selected" : ""}>На проекте</option></select></div>
      <div class="form-row"><label>Ближайший дедлайн</label><input name="nearestDeadline" class="input" type="date" value="${performer?.nearestDeadline || ""}"></div>
      <div class="form-row form-row--wide"><label>Комментарий</label><textarea name="notes" class="textarea">${performer?.notes || ""}</textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green" type="submit">${performer ? "Сохранить изменения" : "Сохранить"}</button><button class="btn" type="button" data-close-modal>${performer ? "Закрыть" : "Отменить"}</button></div>
    </form>`, performer ? {
      backAction: () => openPerformerDetails(performer.id, { scrollTop: sourceScrollTop ?? 0 })
    } : {});
  const roleSelect = byId("performer-role-select");
  const customRoleRow = byId("performer-custom-role-row");
  const customRoleInput = byId("performer-custom-role");
  customRoleInput.required = selectedRole === "__custom__";
  roleSelect.addEventListener("change", () => {
    const isCustom = roleSelect.value === "__custom__";
    customRoleRow.classList.toggle("hide", !isCustom);
    customRoleInput.required = isCustom;
    if (!isCustom) customRoleInput.value = "";
  });
  byId("performer-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const role = data.roleSelect === "__custom__" ? data.customRole.trim() : data.roleSelect;
    if (!role) {
      customRoleInput.focus();
      return;
    }
    const nextPerformer = {
      id: performer?.id || uid("pf"),
      name: data.name,
      role,
      email: data.email,
      password: data.password,
      rate: Number(data.rate),
      contacts: data.contacts,
      status: data.status,
      nearestDeadline: data.nearestDeadline,
      notes: data.notes,
      activeProjectsCount: performer?.activeProjectsCount || 0,
      completedProjectsCount: performer?.completedProjectsCount || 0
    };
    if (performer) state.performers[state.performers.findIndex((item) => item.id === performer.id)] = nextPerformer;
    else state.performers.push(nextPerformer);
    saveState();
    if (performer) {
      openPerformerDetails(performer.id, { scrollTop: sourceScrollTop ?? 0 });
      rerenderCurrentPage();
      return;
    }
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
  const income = projectIncome(project);
  const margin = income ? Math.round((project.profit / income) * 100) : 0;
  const taskCount = projectTaskEvents(project.id).length;
  const nearestTask = nearestProjectTask(project.id);
  return `
    <article class="card project-card clickable" onclick="openProjectDetails('${project.id}')">
      <div class="card-top">
        <div><h3 class="entity-name">${project.title}</h3><p class="entity-meta">${project.client} · ${project.location}</p></div>
        <span class="status ${project.status === "В работе" ? "status--active" : project.status === "Монтаж" ? "status--busy" : ""}">${project.status}</span>
      </div>
      <p class="section-note">${project.description}</p>
      <div class="stats-row">
        <div class="mini-stat"><span>Поступило</span><strong>${formatMoney(income)}</strong></div>
        <div class="mini-stat"><span>Расходы</span><strong>${formatMoney(projectExpenses(project))}</strong></div>
        <div class="mini-stat"><span>Прибыль</span><strong class="${project.profit >= 0 ? "money-positive" : "money-negative"}">${formatMoney(project.profit)}</strong></div>
      </div>
      <div class="progress"><span style="width:${Math.max(0, Math.min(100, margin))}%"></span></div>
      <div class="inline-actions">${project.performers.map((id) => `<span class="pill">${performerById(id)?.role || "Исполнитель"}</span>`).join("")}</div>
      <div class="list-item"><span>Задачи проекта</span><strong>${taskCount}</strong></div>
      ${nearestTask ? `<div class="task-inline"><strong>${escapeHtml(nearestTask.title)}</strong><span>${eventTimeLabel(nearestTask, { withDate: true })} · ${performerById(nearestTask.performerId)?.name || "Не назначен"}</span></div>` : `<div class="task-inline"><strong>Задач пока нет</strong><span>Добавь первую задачу в проект</span></div>`}
      <div class="list-item"><span>Черновик: ${formatDate(project.draftDeadline)}</span><strong>Чистовик: ${formatDate(project.finalDeadline)}</strong></div>
    </article>`;
}
function projectMargin(project) {
  const income = projectIncome(project);
  return income ? Math.round((project.profit / income) * 100) : 0;
}
function projectTaskEvents(projectId, options = {}) {
  const includeAuto = options.includeAuto !== false;
  return calendarEventsWithDeadlines()
    .filter((event) => event.projectId === projectId && (includeAuto || !/^(draft-|final-|shoot-)/.test(String(event.id))))
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
}
function nearestProjectTask(projectId) {
  const now = new Date();
  const list = projectTaskEvents(projectId);
  return list.find((event) => new Date(event.startDateTime) >= now) || list[0] || null;
}
function projectTaskCardHtml(event, projectId) {
  const performer = performerById(event.performerId);
  const doneClass = event.status === "Готово" ? "is-done" : "";
  return `<button class="task-card task-card--${event.type} ${doneClass}" onclick="openEventDetails('${event.id}', '${projectId}', currentModalScrollTop())">
    <div class="task-card__time">${eventTimeLabel(event, { withDate: true })}</div>
    <div class="task-card__title">${escapeHtml(event.title)}</div>
    <div class="task-card__meta">${performer?.name || "Не назначен"} · ${event.status} · ${event.priority}</div>
  </button>`;
}
function projectPaymentRows(project) {
  return (project.payments || []).sort((a, b) => new Date(a.date) - new Date(b.date));
}
function projectFinancialBreakdown(project) {
  return [
    { label: "Согласованный бюджет", value: formatMoney(project.clientPayment) },
    { label: "Получено оплат", value: formatMoney(projectIncome(project)) },
    { label: "Проектные расходы", value: formatMoney((project.expenses || []).reduce((sum, expense) => sum + Number(expense.amount || 0), 0)) },
    { label: "Аренда техники", value: formatMoney(projectEquipmentTotal(project)) },
    { label: "Прибыль", value: formatMoney(project.profit), valueClass: project.profit >= 0 ? "money-positive" : "money-negative" },
    { label: "Маржинальность", value: `${projectMargin(project)}%` }
  ];
}
function fileCardHtml(file) {
  return `<article class="file-card">
    <div class="file-card__top">
      <span class="badge">${file.category}</span>
      <span class="small">${formatDate(file.date)}</span>
    </div>
    <div class="file-card__title">${escapeHtml(file.title)}</div>
    <p class="file-card__note">${escapeHtml(file.note || "Файл проекта готов к подмене реальной ссылкой из backend/storage.")}</p>
    <div class="file-card__actions">
      <a class="btn btn--ghost" href="${file.url}" download="${escapeHtml(file.title)}" onclick="event.stopPropagation()">Скачать</a>
    </div>
  </article>`;
}
function projectPaymentCardHtml(payment, projectId) {
  return `<div class="finance-item">
    <div class="finance-item__main">
      <div class="finance-item__title">${formatMoney(payment.amount)}</div>
      <div class="finance-item__meta">${formatDate(payment.date)} · ${payment.method}${payment.comment ? ` · ${escapeHtml(payment.comment)}` : ""}</div>
    </div>
    <div class="finance-item__side">
      <span class="badge badge--green">Оплата</span>
      ${editIconButton(`openProjectPaymentEdit('${projectId}', '${payment.id}', currentModalScrollTop())`)}
    </div>
  </div>`;
}
function projectExpenseCardHtml(expense, projectId) {
  return `<div class="finance-item">
    <div class="finance-item__main">
      <div class="finance-item__title">${escapeHtml(expense.title)}</div>
      <div class="finance-item__meta">${expense.category} · ${formatDate(expense.date)} · ${expense.paymentMethod}${expense.paidAt ? ` · выплата ${formatDate(expense.paidAt)}` : ""}${expense.comment ? ` · ${escapeHtml(expense.comment)}` : ""}</div>
    </div>
    <div class="finance-item__side">
      <strong>${formatMoney(expense.amount)}</strong>
      ${expense.receiptFile ? `<a href="${buildMockDownloadUrl(expense.receiptFile, expense.comment)}" class="file-link" download="${escapeHtml(expense.receiptFile)}" onclick="event.stopPropagation()">Скачать чек</a>` : `<span class="small">Без чека</span>`}
      ${editIconButton(`openProjectExpenseEdit('${projectId}', '${expense.id}', currentModalScrollTop())`)}
    </div>
  </div>`;
}
function projectEquipmentRowHtml(item, projectId) {
  return `<div class="matrix-row">
    <div>
      <strong>${escapeHtml(item.name)}</strong>
      <p class="list-item__text">${item.category}</p>
    </div>
    <span>${item.quantity} шт.</span>
    <span>${formatMoney(item.pricePerUnit)}</span>
    <span>${item.rentalDays} дн.</span>
    <div class="inline-actions"><strong>${formatMoney(item.totalPrice)}</strong>${editIconButton(`openProjectEquipmentEdit('${projectId}', '${item.id}', currentModalScrollTop())`)}</div>
  </div>`;
}
function openProjectDetails(id, options = {}) {
  const project = projectById(id);
  openModal(project.title, projectDetailsHtml(project), { wide: true, note: "Все блоки рассчитаны на замену mock-данных ответами backend/API.", scrollTop: options.scrollTop });
  bindProjectDetailForms(project.id);
}
function refreshProjectDetails(projectId) {
  openProjectDetails(projectId, { scrollTop: currentModalScrollTop() });
}
function removeProjectPerformer(projectId, performerId) {
  const project = projectById(projectId);
  if (!project) return;
  project.performers = (project.performers || []).filter((id) => id !== performerId);
  Object.keys(project.calendarAssignments || {}).forEach((eventId) => {
    if (project.calendarAssignments[eventId] === performerId) delete project.calendarAssignments[eventId];
  });
  saveState();
  refreshProjectDetails(projectId);
}
function projectDetailsHtml(project) {
  const performerOptions = state.performers.map((p) => `<option value="${p.id}">${p.name} · ${p.role} · ${formatMoney(p.rate)} · ${p.status}</option>`).join("");
  const income = projectIncome(project);
  const financials = projectFinancialBreakdown(project);
  const shootingEnabled = Boolean(project.shootingDates?.length && project.shootingDates?.[0]?.start);
  const projectTasks = projectTaskEvents(project.id);
  return `
    <div class="tabs">
      <button class="tab active">Карточка проекта</button>
      ${editIconButton(`openProjectForm('${project.id}', currentModalScrollTop())`)}
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
        <h3 class="section-title">Финансовый срез</h3>
        <div class="ledger-grid" style="margin-top:12px">
          ${financials.map((item) => `<div class="ledger-card"><span>${item.label}</span><strong class="${item.valueClass || ""}">${item.value}</strong></div>`).join("")}
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
          return `<div class="list-item"><div><strong>${p?.name}</strong><p class="list-item__text">${p?.role} · ${formatMoney(p?.rate)} · ${p?.status}</p></div><div class="inline-actions"><span class="badge">Дедлайн ${formatDate(p?.nearestDeadline)}</span><button class="icon-btn icon-btn--danger" type="button" title="Убрать из проекта" aria-label="Убрать из проекта" onclick="removeProjectPerformer('${project.id}', '${id}')">×</button></div></div>`;
        }).join("")}</div>
      </div>
      <div class="panel">
        <div class="section-head">
          <div>
            <h3 class="section-title">Задачи проекта</h3>
            <p class="section-note">Внутренние задачи, дедлайны и съёмочные события с привязкой к исполнителям.</p>
          </div>
          <button class="btn btn--green" onclick="openProjectTaskForm('${project.id}')">Добавить задачу</button>
        </div>
        <div class="task-grid">${projectTasks.map((event) => projectTaskCardHtml(event, project.id)).join("") || `<div class="empty">У проекта ещё нет задач.</div>`}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Файлы проекта</h3>
        <form id="project-file-form" class="form-grid" style="margin-top:12px">
          <div class="form-row"><label>Категория</label><select name="category" class="select">${fileCategories.map((category) => `<option>${category}</option>`).join("")}</select></div>
          ${input("note", "Комментарий к файлу", "text", false, "")}
          <div class="form-row form-row--wide"><label>Файл</label><input name="title" class="input" type="file"></div>
          <div class="form-row form-row--wide"><button class="btn">Прикрепить</button></div>
        </form>
        <div class="file-grid" style="margin-top:12px">${(project.files || []).map(fileCardHtml).join("") || `<div class="empty">Файлы ещё не загружены.</div>`}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Оборудование и аренда</h3>
        <p class="section-note">${shootingEnabled ? "Позиции техники влияют на расходы проекта и сразу учитываются во вкладке «Финансы»." : "Сначала укажи съёмочные даты в проекте, затем здесь можно будет хранить аренду техники."}</p>
        <form id="equipment-form" class="form-grid" style="margin-top:12px">
          <div class="form-row">
            <label>Категория техники</label>
            <select name="category" class="select">${equipmentCategories.map((category) => `<option>${category}</option>`).join("")}</select>
          </div>
          <div class="form-row">
            <label>Позиция</label>
            <input name="name" list="equipment-preset-list" class="input" type="text" placeholder="Начни вводить название" required>
            <datalist id="equipment-preset-list">${equipmentPresets().map((preset) => `<option value="${escapeHtml(preset.name)}">${escapeHtml(preset.category)} · ${formatMoney(preset.pricePerUnit)}</option>`).join("")}</datalist>
          </div>
          ${input("quantity", "Количество", "number", true, 1)}
          ${input("pricePerUnit", "Цена за единицу", "number", true)}
          ${input("rentalDays", "Дней аренды", "number", true, 1)}
          <div class="form-row form-row--wide"><label>Чек / договор аренды</label><input name="receiptFile" class="input" type="file"></div>
          <div class="form-row form-row--wide"><button class="btn btn--green">Добавить оборудование</button></div>
        </form>
        <div class="matrix-list" style="margin-top:12px">
          <div class="matrix-row matrix-row--head"><span>Позиция</span><span>Кол-во</span><span>Ставка</span><span>Дней</span><span>Итог</span></div>
          ${(project.equipment || []).map((item) => projectEquipmentRowHtml(item, project.id)).join("") || `<div class="empty">Пока нет добавленной техники.</div>`}
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Расходы проекта</h3>
        ${expenseFormHtml("project-expense-form", project.id)}
        <div class="finance-stack" style="margin-top:12px">${(project.expenses || []).map((expense) => projectExpenseCardHtml(expense, project.id)).join("") || `<div class="empty">Пока нет проектных трат.</div>`}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Оплаты и поступления</h3>
        <form id="project-payment-form" class="form-grid" style="margin-top:12px">
          ${input("amount", "Сумма оплаты", "number", true)}
          ${input("date", "Дата получения", "date", true, localISODate())}
          <div class="form-row"><label>Вид оплаты</label><select name="method" class="select">${paymentMethods.map((method) => `<option>${method}</option>`).join("")}</select></div>
          ${input("comment", "Комментарий", "text", false, "")}
          <div class="form-row form-row--wide"><button class="btn btn--green">Добавить оплату</button></div>
        </form>
        <div class="finance-stack" style="margin-top:12px">${projectPaymentRows(project).map((payment) => projectPaymentCardHtml(payment, project.id)).join("") || `<div class="empty">Поступлений ещё нет.</div>`}</div>
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
    refreshProjectDetails(projectId);
  });
  const equipmentForm = byId("equipment-form");
  if (equipmentForm) {
    setupEquipmentForm(equipmentForm);
    equipmentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const file = equipmentForm.querySelector("[name='receiptFile']")?.files[0];
      project.equipment.push(normalizeEquipmentItem({
        id: uid("eq"),
        name: data.name,
        category: data.category,
        quantity: Number(data.quantity),
        pricePerUnit: Number(data.pricePerUnit),
        rentalDays: Number(data.rentalDays),
        receiptFile: file?.name || ""
      }));
      if (file?.name) {
        state.documents.push(normalizeDocument({
          id: uid("doc"),
          projectId,
          type: "Чек",
          title: data.name,
          amount: Number(data.quantity) * Number(data.pricePerUnit) * Number(data.rentalDays),
          date: project.shootingDates?.[0]?.start || localISODate(),
          pdfFile: "",
          receiptFile: file.name,
          myTaxLink: "",
          comment: "Аренда техники"
        }));
      }
      rememberEquipmentPreset(data.name, data.category, data.pricePerUnit);
      saveState();
      refreshProjectDetails(projectId);
    });
  }
  bindExpenseForm("project-expense-form", projectId, () => refreshProjectDetails(projectId));
  const fileForm = byId("project-file-form");
  if (fileForm) fileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = form.querySelector("[name='title']").files[0];
    project.files.push(normalizeProjectFile({ id: uid("fl"), category: data.get("category"), title: file?.name || "Документ без имени", url: "", date: new Date().toISOString().slice(0, 10), note: data.get("note") || "" }));
    if (["Чек", "Счёт", "Акт", "PDF"].includes(data.get("category"))) {
      state.documents.push(normalizeDocument({ id: uid("doc"), projectId, type: data.get("category"), title: file?.name || "Документ без имени", amount: 0, date: localISODate(), pdfFile: file?.name || "", receiptFile: data.get("category") === "Чек" ? file?.name || "" : "", myTaxLink: "", comment: data.get("note") || "" }));
    }
    saveState();
    refreshProjectDetails(projectId);
  });
  const paymentForm = byId("project-payment-form");
  if (paymentForm) paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(paymentForm));
    project.payments.push({ id: uid("pay"), amount: Number(data.amount), date: data.date, method: data.method, comment: data.comment || "" });
    saveState();
    refreshProjectDetails(projectId);
  });
  renderChat(byId("project-chat"), project.chat || [], (text) => {
    project.chat.push({ author: "Николай", role: "Режиссёр", time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }), text });
    saveState();
    refreshProjectDetails(projectId);
  });
}
function openProjectPaymentEdit(projectId, paymentId, sourceScrollTop = 0) {
  const project = projectById(projectId);
  const payment = project?.payments?.find((item) => item.id === paymentId);
  if (!project || !payment) return;
  openModal("Изменить оплату", `
    <form id="payment-edit-form" class="form-grid">
      ${input("amount", "Сумма оплаты", "number", true, payment.amount)}
      ${input("date", "Дата получения", "date", true, payment.date)}
      <div class="form-row"><label>Вид оплаты</label><select name="method" class="select">${paymentMethods.map((method) => `<option ${method === payment.method ? "selected" : ""}>${method}</option>`).join("")}</select></div>
      ${input("comment", "Комментарий", "text", false, payment.comment || "")}
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить</button><button class="btn" type="button" data-close-modal>Закрыть</button></div>
    </form>`, {
    backAction: () => openProjectDetails(projectId, { scrollTop: sourceScrollTop })
  });
  byId("payment-edit-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    Object.assign(payment, { amount: Number(data.amount), date: data.date, method: data.method, comment: data.comment || "" });
    saveState();
    openProjectDetails(projectId, { scrollTop: sourceScrollTop });
  });
}
function openProjectExpenseEdit(projectId, expenseId, sourceScrollTop = 0) {
  const project = projectById(projectId);
  const expense = project?.expenses?.find((item) => item.id === expenseId);
  if (!project || !expense) return;
  openModal("Изменить расход", `
    <form id="expense-edit-form" class="form-grid">
      <div class="form-row"><label>Категория</label><select name="category" class="select" data-expense-category>${expenseCategories.map((category) => `<option ${category === expense.category ? "selected" : ""}>${category}</option>`).join("")}</select></div>
      <div class="form-row"><label>Типовая трата</label><select name="typical" class="select" data-expense-typical></select></div>
      <div class="form-row hide" data-expense-custom-row><label>Своя трата / название</label><input name="customTitle" class="input" type="text" value="${escapeHtml(expense.title)}"></div>
      ${input("amount", "Сумма", "number", true, expense.amount)}
      ${input("date", "Дата", "date", true, expense.date)}
      ${input("paidAt", "Дата выплаты", "date", true, expense.paidAt)}
      <div class="form-row"><label>Способ оплаты</label><select name="paymentMethod" class="select">${paymentMethods.map((method) => `<option ${method === expense.paymentMethod ? "selected" : ""}>${method}</option>`).join("")}</select></div>
      <div class="form-row"><label>Чек / документ</label><input name="receiptFile" class="input" type="file"><p class="small">${expense.receiptFile ? `Сейчас: ${escapeHtml(expense.receiptFile)}` : "Без чека"}</p></div>
      <div class="form-row form-row--wide"><label>Комментарий</label><textarea name="comment" class="textarea">${escapeHtml(expense.comment || "")}</textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить</button><button class="btn" type="button" data-close-modal>Отменить</button></div>
    </form>`, { wide: true, backAction: () => openProjectDetails(projectId, { scrollTop: sourceScrollTop }) });
  const form = byId("expense-edit-form");
  setupExpenseForm(form);
  const typical = form.querySelector("[data-expense-typical]");
  const templates = getExpenseTemplates(expense.category);
  typical.value = templates.includes(expense.title) ? expense.title : "__custom__";
  typical.dispatchEvent(new Event("change"));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const file = form.querySelector("[name='receiptFile']")?.files[0];
    const title = data.typical === "__custom__" ? data.customTitle?.trim() : data.typical;
    Object.assign(expense, normalizeExpense({ ...expense, category: data.category, title, amount: Number(data.amount), date: data.date, paidAt: data.paidAt, paymentMethod: data.paymentMethod, comment: data.comment || "", receiptFile: file?.name || expense.receiptFile || "" }));
    rememberExpenseTemplate(data.category, title);
    saveState();
    openProjectDetails(projectId, { scrollTop: sourceScrollTop });
  });
}
function openProjectEquipmentEdit(projectId, itemId, sourceScrollTop = 0) {
  const project = projectById(projectId);
  const item = project?.equipment?.find((entry) => entry.id === itemId);
  if (!project || !item) return;
  openModal("Изменить аренду техники", `
    <form id="equipment-edit-form" class="form-grid">
      <div class="form-row"><label>Категория техники</label><select name="category" class="select">${equipmentCategories.map((category) => `<option ${category === item.category ? "selected" : ""}>${category}</option>`).join("")}</select></div>
      <div class="form-row">
        <label>Позиция</label>
        <input name="name" list="equipment-edit-preset-list" class="input" type="text" value="${escapeHtml(item.name)}" required>
        <datalist id="equipment-edit-preset-list">${equipmentPresets().map((preset) => `<option value="${escapeHtml(preset.name)}">${escapeHtml(preset.category)} · ${formatMoney(preset.pricePerUnit)}</option>`).join("")}</datalist>
      </div>
      ${input("quantity", "Количество", "number", true, item.quantity)}
      ${input("pricePerUnit", "Цена за единицу", "number", true, item.pricePerUnit)}
      ${input("rentalDays", "Дней аренды", "number", true, item.rentalDays)}
      <div class="form-row form-row--wide"><label>Чек / договор аренды</label><input name="receiptFile" class="input" type="file"><p class="small">${item.receiptFile ? `Сейчас: ${escapeHtml(item.receiptFile)}` : "Без документа"}</p></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить</button><button class="btn" type="button" data-close-modal>Отменить</button></div>
    </form>`, { wide: true, backAction: () => openProjectDetails(projectId, { scrollTop: sourceScrollTop }) });
  const form = byId("equipment-edit-form");
  setupEquipmentForm(form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const file = form.querySelector("[name='receiptFile']")?.files[0];
    Object.assign(item, normalizeEquipmentItem({ ...item, name: data.name, category: data.category, quantity: Number(data.quantity), pricePerUnit: Number(data.pricePerUnit), rentalDays: Number(data.rentalDays), receiptFile: file?.name || item.receiptFile || "" }));
    rememberEquipmentPreset(data.name, data.category, data.pricePerUnit);
    saveState();
    openProjectDetails(projectId, { scrollTop: sourceScrollTop });
  });
}
function openProjectForm(id = null, sourceScrollTop = null) {
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
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить</button><button class="btn" type="button" data-close-modal>${project ? "Закрыть" : "Отменить"}</button></div>
    </form>`, project ? {
    wide: true,
    backAction: () => openProjectDetails(project.id, { scrollTop: sourceScrollTop ?? 0 })
  } : { wide: true });
  bindProjectLocationPicker(coordinates, project?.location || "");
  const projectForm = byId("project-form");
  setupDatePairSync(projectForm, "startDate", "draftDeadline", { offsetDays: 7 });
  setupDatePairSync(projectForm, "draftDeadline", "finalDeadline", { offsetDays: 7 });
  setupDatePairSync(projectForm, "shootingStart", "shootingEnd");
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
      payments: project?.payments || [],
      expenses: project?.expenses || [],
      equipment: project?.equipment || [],
      files: project?.files || [],
      chat: project?.chat || []
    };
    if (project) state.projects[state.projects.findIndex((item) => item.id === project.id)] = next;
    else state.projects.push(next);
    saveState();
    if (project) {
      openProjectDetails(project.id, { scrollTop: sourceScrollTop ?? 0 });
      rerenderCurrentPage();
      return;
    }
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
  document.querySelectorAll("[data-finance-period]").forEach((btn) => btn.addEventListener("click", () => {
    financeChartPeriod = btn.dataset.financePeriod;
    document.querySelectorAll("[data-finance-period]").forEach((el) => el.classList.toggle("active", el === btn));
    renderFinanceCharts();
  }));
  document.querySelectorAll("[data-finance-period]").forEach((el) => el.classList.toggle("active", el.dataset.financePeriod === financeChartPeriod));
  renderFinanceCharts();
  renderFinanceTab();
}
function filteredFinanceExpenses() {
  return financeCategoryFilter ? allExpenses().filter((expense) => expense.category === financeCategoryFilter) : allExpenses();
}
function filteredFinanceProjects() {
  if (!financeCategoryFilter) return state.projects;
  return state.projects.filter((project) => projectExpenseRows(project).some((expense) => expense.category === financeCategoryFilter));
}
function financeFilterBanner() {
  if (!financeCategoryFilter) return "";
  return `<div class="section-head" style="margin-bottom:12px"><div><h3 class="section-title">Фильтр по категории</h3><p class="section-note">Показаны только проекты и расходы, где есть траты категории «${financeCategoryFilter}».</p></div><button class="btn btn--ghost" onclick="clearFinanceCategoryFilter()">Сбросить фильтр</button></div>`;
}
function renderFinanceTab() {
  const root = byId("finance-tab-content");
  if (financeTab === "projects") {
    const projects = filteredFinanceProjects();
    root.innerHTML = financeFilterBanner() + table(["Проект", "Клиент", "Бюджет", "Получено", "Расходы", "Прибыль", "Маржа"], projects.map((p) => [p.title, p.client, formatMoney(p.clientPayment), formatMoney(projectIncome(p)), formatMoney(projectExpenses(p)), formatMoney(p.profit), `${projectMargin(p)}%`]));
  }
  if (financeTab === "expenses") {
    const expenses = filteredFinanceExpenses();
    root.innerHTML = `<div class="section-head"><h2 class="section-title">Расходы</h2><button class="btn btn--green" data-action="open-expense-create">Добавить трату</button></div>${financeFilterBanner()}` + table(["Тип", "Проект", "Категория", "Название", "Сумма", "Дата", "Выплата", "Способ", "Чек"], expenses.map((e) => [e.type === "general" ? "Общая" : e.type === "equipment" ? "Техника" : "Проект", projectById(e.projectId)?.title || "Без проекта", e.category, e.title, formatMoney(e.amount), formatDate(e.date), formatDate(e.paidAt), e.paymentMethod, e.receiptFile || "Нет"]));
  }
  if (financeTab === "documents") {
    root.innerHTML = financeFilterBanner() + table(["Тип", "Проект", "Название", "Сумма", "Дата", "PDF/чек", "Мой налог"], state.documents.map((d) => [d.type, projectById(d.projectId)?.title || "Без проекта", d.title, formatMoney(d.amount), formatDate(d.date), d.pdfFile || d.receiptFile || "Нет", d.myTaxLink ? `<a href="${d.myTaxLink}" target="_blank">Открыть</a>` : "Нет"]));
  }
}
function renderFinanceCharts() {
  if (!window.Chart) return;
  Object.values(financeCharts).forEach((chart) => chart.destroy());
  financeCharts = {};
  const monthlySeries = financeMonthlySeries(financeChartPeriod);
  financeCharts.line = new Chart(byId("finance-line"), {
    type: "line",
    data: {
      labels: monthlySeries.labels,
      datasets: [
        { label: "Доходы", data: monthlySeries.income, borderColor: "#191a23", backgroundColor: "rgba(185,255,102,.28)", tension: .32, fill: true },
        { label: "Расходы", data: monthlySeries.expenses, borderColor: "#ef5350", backgroundColor: "rgba(239,83,80,.14)", tension: .32, fill: true }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true } },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatMoney(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatMoney(value)
          }
        }
      }
    }
  });
  const byCategory = groupByAmount(allExpenses(), "category");
  const pieLabels = Object.keys(byCategory);
  financeCharts.pie = new Chart(byId("finance-pie"), {
    type: "doughnut",
    data: {
      labels: pieLabels,
      datasets: [{
        data: Object.values(byCategory),
        backgroundColor: ["#b9ff66", "#191a23", "#3975d6", "#ef5350", "#f2b84b", "#26a69a", "#d8ffad"],
        offset: pieLabels.map((label) => label === financeCategoryFilter ? 16 : 0)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (_, elements) => {
        const index = elements?.[0]?.index;
        if (index === undefined) return;
        const nextCategory = pieLabels[index];
        financeCategoryFilter = financeCategoryFilter === nextCategory ? "" : nextCategory;
        renderFinanceCharts();
        renderFinanceTab();
      },
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${formatMoney(ctx.parsed)}`
          }
        }
      }
    }
  });
}
function financeMonthlySeries(period) {
  const incomeRecords = state.projects.flatMap((project) => (project.payments || []).map((payment) => ({ date: payment.date, amount: Number(payment.amount || 0) })));
  const expenseRecords = allExpenses().map((expense) => ({ date: expense.paidAt || expense.date, amount: Number(expense.amount || 0) }));
  const allDates = [...incomeRecords.map((item) => item.date), ...expenseRecords.map((item) => item.date)].filter(Boolean).sort();
  const endDate = allDates.length ? new Date(`${allDates[allDates.length - 1]}T12:00:00`) : new Date();
  let monthsCount = null;
  if (period === "2m") monthsCount = 2;
  if (period === "6m") monthsCount = 6;
  if (period === "1y") monthsCount = 12;
  let startDate;
  if (monthsCount) {
    startDate = new Date(endDate.getFullYear(), endDate.getMonth() - (monthsCount - 1), 1);
  } else {
    const firstDate = allDates.length ? new Date(`${allDates[0]}T12:00:00`) : new Date();
    startDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
  }
  if (period === "all") {
    const years = [];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    for (let year = startYear; year <= endYear; year++) years.push(year);
    const incomeMap = new Map();
    const expenseMap = new Map();
    incomeRecords.forEach((item) => {
      const year = new Date(`${item.date}T12:00:00`).getFullYear();
      incomeMap.set(year, (incomeMap.get(year) || 0) + item.amount);
    });
    expenseRecords.forEach((item) => {
      const year = new Date(`${item.date}T12:00:00`).getFullYear();
      expenseMap.set(year, (expenseMap.get(year) || 0) + item.amount);
    });
    return {
      labels: years.map((year) => String(year)),
      income: years.map((year) => incomeMap.get(year) || 0),
      expenses: years.map((year) => expenseMap.get(year) || 0)
    };
  }
  const months = [];
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (cursor <= endDate) {
    months.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  const labels = months.map((date) => new Intl.DateTimeFormat("ru-RU", { month: "short", year: "2-digit" }).format(date));
  const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const incomeMap = new Map();
  const expenseMap = new Map();
  incomeRecords.forEach((item) => {
    const date = new Date(`${item.date}T12:00:00`);
    const key = monthKey(date);
    incomeMap.set(key, (incomeMap.get(key) || 0) + item.amount);
  });
  expenseRecords.forEach((item) => {
    const date = new Date(`${item.date}T12:00:00`);
    const key = monthKey(date);
    expenseMap.set(key, (expenseMap.get(key) || 0) + item.amount);
  });
  return {
    labels,
    income: months.map((date) => incomeMap.get(monthKey(date)) || 0),
    expenses: months.map((date) => expenseMap.get(monthKey(date)) || 0)
  };
}
function clearFinanceCategoryFilter() {
  financeCategoryFilter = "";
  renderFinanceCharts();
  renderFinanceTab();
}
function openExpenseForm(projectId = "") {
  openModal("Добавить трату", expenseFormHtml("expense-form", projectId, true), { note: "Расход можно связать с проектом или оставить общей тратой.", wide: true });
  bindExpenseForm("expense-form", projectId, () => { closeModal(); rerenderCurrentPage(); });
}
function expenseFormHtml(formId, projectId = "", withProjectSelect = false) {
  return `
    <form id="${formId}" class="form-grid" style="margin-top:12px">
      ${withProjectSelect ? `<div class="form-row"><label>Проект</label><select name="projectId" class="select"><option value="">Общая трата</option>${state.projects.map((p) => `<option value="${p.id}" ${p.id === projectId ? "selected" : ""}>${p.title}</option>`).join("")}</select></div>` : `<input type="hidden" name="projectId" value="${projectId}">`}
      <div class="form-row"><label>Категория</label><select name="category" class="select" data-expense-category>${expenseCategories.map((c) => `<option>${c}</option>`).join("")}</select></div>
      <div class="form-row"><label>Типовая трата</label><select name="typical" class="select" data-expense-typical></select></div>
      <div class="form-row hide" data-expense-custom-row><label>Своя трата / название</label><input name="customTitle" class="input" type="text"></div>
      ${input("amount", "Сумма", "number", true)}
      ${input("date", "Дата", "date", true, localISODate())}
      ${input("paidAt", "Дата выплаты", "date", true, localISODate())}
      <div class="form-row"><label>Способ оплаты</label><select name="paymentMethod" class="select">${paymentMethods.map((method) => `<option>${method}</option>`).join("")}</select></div>
      <div class="form-row"><label>Чек / документ</label><input name="receiptFile" class="input" type="file"></div>
      <div class="form-row form-row--wide"><label>Комментарий</label><textarea name="comment" class="textarea"></textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить трату</button></div>
    </form>`;
}
function bindExpenseForm(formId, fixedProjectId, afterSave) {
  const form = byId(formId);
  if (!form) return;
  setupExpenseForm(form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const file = form.querySelector("[name='receiptFile']")?.files[0];
    const title = data.typical === "__custom__" ? data.customTitle?.trim() : data.typical;
    const expense = normalizeExpense({ id: uid("ex"), projectId: data.projectId || null, category: data.category, title, amount: Number(data.amount), date: data.date, paidAt: data.paidAt, paymentMethod: data.paymentMethod, comment: data.comment, receiptFile: file?.name || "", type: data.projectId ? "project" : "general" });
    rememberExpenseTemplate(data.category, title);
    if (expense.projectId) projectById(expense.projectId).expenses.push(expense);
    else state.generalExpenses.push(expense);
    if (expense.receiptFile) state.documents.push(normalizeDocument({ id: uid("doc"), projectId: expense.projectId, type: "Чек", title: expense.title, amount: expense.amount, date: expense.date, pdfFile: "", receiptFile: expense.receiptFile, myTaxLink: "", comment: expense.comment }));
    saveState();
    afterSave();
  });
}
function setupExpenseForm(form) {
  const categorySelect = form.querySelector("[data-expense-category]");
  const typicalSelect = form.querySelector("[data-expense-typical]");
  const customRow = form.querySelector("[data-expense-custom-row]");
  const customInput = form.querySelector("[name='customTitle']");
  if (!categorySelect || !typicalSelect) return;
  setupDatePairSync(form, "date", "paidAt");
  const renderTemplates = () => {
    const category = categorySelect.value;
    typicalSelect.innerHTML = `${getExpenseTemplates(category).map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}<option value="__custom__">Своя трата...</option>`;
    toggleCustom();
  };
  const toggleCustom = () => {
    const isCustom = typicalSelect.value === "__custom__";
    customRow?.classList.toggle("hide", !isCustom);
    if (customInput) customInput.required = isCustom;
  };
  categorySelect.addEventListener("change", renderTemplates);
  typicalSelect.addEventListener("change", toggleCustom);
  renderTemplates();
}
function setupEquipmentForm(form) {
  const nameInput = form.querySelector("[name='name']");
  const priceInput = form.querySelector("[name='pricePerUnit']");
  const categorySelect = form.querySelector("[name='category']");
  if (!nameInput || !priceInput || !categorySelect) return;
  const syncPreset = () => {
    const preset = equipmentPresetByName(nameInput.value);
    if (!preset) return;
    if (!Number(priceInput.value)) priceInput.value = preset.pricePerUnit;
    categorySelect.value = preset.category || categorySelect.value;
  };
  nameInput.addEventListener("change", syncPreset);
  nameInput.addEventListener("blur", syncPreset);
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
  const projectEvents = state.projects.flatMap((project) => {
    const draftId = `draft-${project.id}`;
    const finalId = `final-${project.id}`;
    const withOverride = (event) => applyProjectEventOverride(project, event);
    return [
      { id: draftId, title: `Черновик: ${project.title}`, description: "Автоматически из проекта", startDateTime: `${project.draftDeadline}T17:00`, endDateTime: `${project.draftDeadline}T18:00`, projectId: project.id, performerId: project.calendarAssignments?.[draftId] || "", status: project.status, priority: "Высокий", type: "deadline" },
      { id: finalId, title: `Чистовик: ${project.title}`, description: "Автоматически из проекта", startDateTime: `${project.finalDeadline}T17:00`, endDateTime: `${project.finalDeadline}T18:00`, projectId: project.id, performerId: project.calendarAssignments?.[finalId] || "", status: project.status, priority: "Высокий", type: "deadline" },
      ...(project.shootingDates || []).map((date) => {
        const shootId = `shoot-${project.id}-${date.start}`;
        return { id: shootId, title: `Съёмка: ${project.title}`, description: project.location, startDateTime: `${date.start}T10:00`, endDateTime: `${date.end}T18:00`, projectId: project.id, performerId: project.calendarAssignments?.[shootId] || project.performers[0] || "", status: project.status, priority: "Высокий", type: "shoot" };
      })
    ].map(withOverride);
  });
  return [...state.events, ...projectEvents];
}
function isAutoProjectEvent(id = "") {
  return /^(draft-|final-|shoot-)/.test(String(id));
}
function applyProjectEventOverride(project, event) {
  const override = project.calendarEventOverrides?.[event.id] || {};
  return { ...event, ...override, id: event.id, projectId: project.id };
}
function findCalendarEvent(id) {
  const directIndex = state.events.findIndex((event) => event.id === id);
  if (directIndex >= 0) return { event: state.events[directIndex], source: "manual", index: directIndex, project: projectById(state.events[directIndex].projectId) };
  const event = calendarEventsWithDeadlines().find((item) => item.id === id);
  return event ? { event, source: "auto", project: projectById(event.projectId) } : null;
}
function saveCalendarEventUpdate(id, patch) {
  const found = findCalendarEvent(id);
  if (!found) return;
  if (found.source === "manual") {
    state.events[found.index] = { ...state.events[found.index], ...patch, id };
  } else if (found.project) {
    found.project.calendarEventOverrides = found.project.calendarEventOverrides || {};
    found.project.calendarEventOverrides[id] = { ...(found.project.calendarEventOverrides[id] || {}), ...patch };
    if (patch.performerId !== undefined) {
      found.project.calendarAssignments = found.project.calendarAssignments || {};
      if (patch.performerId) found.project.calendarAssignments[id] = patch.performerId;
      else delete found.project.calendarAssignments[id];
    }
  }
  saveState();
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
    title.textContent = `${formatDate(days[0])} - ${formatDate(days[6])}`;
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
    cells.push(`<div class="calendar-cell ${date.getMonth() !== month ? "is-muted" : ""} ${iso === localISODate() ? "is-today" : ""}" data-date="${iso}" onclick="openCalendarDay('${iso}')"><div class="calendar-date">${date.getDate()}</div>${dayEvents.map(eventChip).join("")}</div>`);
  }
  return `<div class="calendar-board">${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => `<div class="calendar-day-name">${d}</div>`).join("")}${cells.join("")}</div>`;
}
function openCalendarDay(date) {
  calendarDate = new Date(`${date}T12:00:00`);
  setCalendarView("day");
}
function dayTimeline(day, events) {
  const iso = localISODate(day);
  const dayEvents = events.filter((event) => event.startDateTime.slice(0, 10) === iso).sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
  return `<div class="panel"><div class="section-head"><h3 class="section-title">${formatDate(iso)}</h3></div>${dayEvents.map(eventListItem).join("") || `<div class="empty">Событий нет. Нажмите «Добавить событие» сверху.</div>`}</div>`;
}
function renderDaySchedule(day, events) {
  const iso = localISODate(day);
  const startHour = 8;
  const endHour = 23;
  const hourHeight = 64;
  const dayEvents = events.filter((event) => event.startDateTime.slice(0, 10) === iso).sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
  const reminderEvents = dayEvents.filter((event) => event.allDay);
  const timedEvents = dayEvents.filter((event) => !event.allDay);
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
    </div>
    ${reminderEvents.length ? `<div class="day-reminders">${reminderEvents.map(dayReminderCard).join("")}</div>` : ""}
    <div class="day-schedule">
      <div class="day-hours">${hours.map((hour) => `<div class="day-hour-label">${String(hour).padStart(2, "0")}:00</div>`).join("")}</div>
      <div class="day-grid" onclick="openEventFromDayGrid(event, '${iso}')">
        ${nowLine}
        ${timedEvents.map((event) => dayEventBlock(event, startHour, endHour, hourHeight)).join("")}
      </div>
    </div>`;
}
function openEventFromDayGrid(clickEvent, iso) {
  if (clickEvent.target.closest(".day-event")) return;
  const grid = clickEvent.currentTarget;
  const rect = grid.getBoundingClientRect();
  const hourHeight = 64;
  const startHour = 8;
  const y = Math.max(0, clickEvent.clientY - rect.top);
  const rawMinutes = startHour * 60 + (y / hourHeight) * 60;
  const snapped = Math.round(rawMinutes / 15) * 15;
  const startMinutes = Math.max(startHour * 60, Math.min(22 * 60, snapped));
  const endMinutes = Math.min(23 * 60, startMinutes + 60);
  const toTime = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  openEventForm(iso, { start: toTime(startMinutes), end: toTime(endMinutes) });
}
function dayReminderCard(event) {
  const project = projectById(event.projectId);
  const performer = performerById(event.performerId);
  const doneClass = event.status === "Готово" ? "is-done" : "";
  return `
    <button class="day-reminder ${doneClass}" onclick="openEventDetails('${event.id}')">
      <div class="day-reminder__main">
        <div class="day-reminder__label">Напоминание на день</div>
        <div class="day-reminder__title">${escapeHtml(event.title)}</div>
        <div class="day-reminder__meta">${project?.title || "Без проекта"} · ${performer?.name || "Без исполнителя"} · ${event.priority}</div>
      </div>
      <span class="day-reminder__tag">${event.type === "deadline" ? "Дедлайн" : "Весь день"}</span>
    </button>`;
}
function dayEventBlock(event, startHour, endHour, hourHeight) {
  const project = projectById(event.projectId);
  const performer = performerById(event.performerId);
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);
  const startMinutes = Math.max(startHour * 60, start.getHours() * 60 + start.getMinutes());
  const endMinutes = Math.min(endHour * 60, end.getHours() * 60 + end.getMinutes());
  const top = ((startMinutes - startHour * 60) / 60) * hourHeight;
  const durationMinutes = Math.max(endMinutes, startMinutes + 30) - startMinutes;
  const height = Math.max(48, (durationMinutes / 60) * hourHeight - 6);
  const densityClass = height < 58 ? "day-event--compact" : height < 96 ? "day-event--medium" : "day-event--roomy";
  const doneClass = event.status === "Готово" ? "is-done" : "";
  return `
    <article class="day-event day-event--${event.type} ${densityClass} ${doneClass}" style="top:${top}px;height:${height}px" onclick="event.stopPropagation(); openEventDetails('${event.id}')">
      <div class="day-event__time">${eventTimeLabel(event)}</div>
      <div class="day-event__title">${event.title}</div>
      <div class="day-event__meta">${project?.title || "Без проекта"} · ${performer?.name || "Без исполнителя"} · ${event.priority}</div>
    </article>`;
}
function eventChip(event) {
  const doneClass = event.status === "Готово" ? "is-done" : "";
  return `<button class="event-chip event-chip--${event.type} ${doneClass}" onclick="event.stopPropagation(); openCalendarDay('${event.startDateTime.slice(0, 10)}')">${event.title}</button>`;
}
function eventListItem(event) {
  const project = projectById(event.projectId);
  const performer = performerById(event.performerId);
  const doneClass = event.status === "Готово" ? "is-done" : "";
  return `<div class="timeline-item clickable ${doneClass}" onclick="openEventDetails('${event.id}')"><div class="timeline-time">${eventTimeLabel(event, { withDate: true })}</div><div><strong>${event.title}</strong><p class="list-item__text">${project?.title || "Без проекта"} · ${performer?.name || "Без исполнителя"} · ${event.status} · ${event.priority}</p></div></div>`;
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
function openEventDetails(id, sourceProjectId = "", sourceProjectScrollTop = 0) {
  const found = findCalendarEvent(id);
  const event = found?.event;
  if (!event) return;
  const project = projectById(event.projectId);
  const actions = `<div class="inline-actions" style="margin-bottom:12px">
    ${editIconButton(`openEventEditForm('${event.id}', '${sourceProjectId}', ${Number(sourceProjectScrollTop || 0)})`)}
    <button class="btn ${event.status === "Готово" ? "" : "btn--green"}" onclick="markEventDone('${event.id}', '${sourceProjectId}', ${Number(sourceProjectScrollTop || 0)})">${event.status === "Готово" ? "Выполнено" : "Отметить выполненной"}</button>
    ${project ? `<button class="btn btn--green" onclick="openCalendarPerformerAssign('${event.id}', '${sourceProjectId}', ${Number(sourceProjectScrollTop || 0)})">${event.performerId ? "Изменить исполнителя" : "Назначить исполнителя"}</button><button class="btn btn--ghost" onclick="openProjectDetails('${project.id}')">Открыть проект</button>` : ""}
  </div>`;
  openModal(event.title, `${actions}<div class="list">
    <div class="list-item"><span>Время</span><strong>${eventTimeLabel(event, { withDate: true })}</strong></div>
    <div class="list-item"><span>Проект</span><strong>${project?.title || "Без проекта"}</strong></div>
    <div class="list-item"><span>Исполнитель</span><strong>${performerById(event.performerId)?.name || "Не назначен"}</strong></div>
    <div class="list-item"><span>Статус / приоритет</span><strong>${event.status} / ${event.priority}</strong></div>
    <div class="list-item"><span>Описание</span><strong>${event.description || "Нет"}</strong></div>
  </div>`, sourceProjectId ? {
    backAction: () => openProjectDetails(sourceProjectId, { scrollTop: sourceProjectScrollTop })
  } : {});
}
function openEventEditForm(eventId, sourceProjectId = "", sourceProjectScrollTop = 0) {
  const found = findCalendarEvent(eventId);
  if (!found) return;
  const event = found.event;
  openEventForm(event.startDateTime.slice(0, 10), {
    ...event,
    editEventId: event.id,
    start: event.startDateTime.slice(11, 16),
    end: event.endDateTime.slice(11, 16),
    sourceProjectId,
    sourceProjectScrollTop
  });
}
function markEventDone(eventId, sourceProjectId = "", sourceProjectScrollTop = 0) {
  saveCalendarEventUpdate(eventId, { status: "Готово" });
  rerenderCurrentPage();
  openEventDetails(eventId, sourceProjectId, sourceProjectScrollTop);
}
function openCalendarPerformerAssign(eventId, sourceProjectId = "", sourceProjectScrollTop = 0) {
  const event = findCalendarEvent(eventId)?.event;
  const project = projectById(event?.projectId);
  if (!event || !project) return;
  openModal("Назначить исполнителя", `
    <form id="event-performer-form" class="form-grid">
      <div class="form-row form-row--wide">
        <label>Исполнитель</label>
        <select name="performerId" class="select">
          <option value="">Не назначен</option>
          ${state.performers.map((performer) => `<option value="${performer.id}" ${performer.id === event.performerId ? "selected" : ""}>${performer.name} · ${performer.role} · ${performer.status}</option>`).join("")}
        </select>
      </div>
      <div class="form-row form-row--wide inline-actions">
        <button class="btn btn--green">Сохранить</button>
        <button class="btn" type="button" data-close-modal>${sourceProjectId ? "Закрыть" : "Отменить"}</button>
      </div>
    </form>`, {
    note: `Назначение сохранится для события «${event.title}» и будет видно на главной, в календаре и в деталях задачи.`,
    backAction: () => openEventDetails(event.id, sourceProjectId, sourceProjectScrollTop)
  });
  byId("event-performer-form").addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
    const performerId = new FormData(submitEvent.currentTarget).get("performerId");
    saveCalendarEventUpdate(event.id, { performerId });
    rerenderCurrentPage();
    openEventDetails(event.id, sourceProjectId, sourceProjectScrollTop);
  });
}
function openEventForm(date = localISODate(), preset = {}) {
  const presetProjectId = preset.projectId || "";
  const isEdit = Boolean(preset.editEventId);
  openModal(isEdit ? "Редактировать задачу" : "Добавить событие", `
    <form id="event-form" class="form-grid">
      ${input("title", "Название задачи", "text", true, preset.title || "")}
      <div class="form-row"><label>Проект</label><select name="projectId" id="event-project-select" class="select"><option value="">Без проекта</option>${state.projects.map((p) => `<option value="${p.id}" ${p.id === presetProjectId ? "selected" : ""}>${p.title}</option>`).join("")}</select></div>
      <div class="form-row"><label>Исполнитель</label><select name="performerId" id="event-performer-select" class="select"><option value="">Не назначен</option>${state.performers.map((p) => `<option value="${p.id}" ${preset.performerId === p.id ? "selected" : ""}>${p.name} · ${p.role}</option>`).join("")}</select></div>
      ${input("date", "Дата", "date", true, date)}
      ${input("start", "Начало", "time", true, preset.start || "10:00")}
      ${input("end", "Окончание", "time", true, preset.end || "13:00")}
      <div class="form-row form-row--wide">
        <label class="check-row">
          <input type="checkbox" name="allDay" id="event-all-day">
          <span>Задача на весь день</span>
        </label>
      </div>
      <div class="form-row"><label>Статус</label><select name="status" class="select"><option ${!preset.status || preset.status === "Запланировано" ? "selected" : ""}>Запланировано</option><option ${preset.status === "В работе" ? "selected" : ""}>В работе</option><option ${preset.status === "Готово" ? "selected" : ""}>Готово</option></select></div>
      <div class="form-row"><label>Приоритет</label><select name="priority" class="select"><option ${!preset.priority || preset.priority === "Средний" ? "selected" : ""}>Средний</option><option ${preset.priority === "Высокий" ? "selected" : ""}>Высокий</option><option ${preset.priority === "Низкий" ? "selected" : ""}>Низкий</option></select></div>
      <div class="form-row"><label>Тип</label><select name="type" class="select"><option value="task" ${!preset.type || preset.type === "task" ? "selected" : ""}>Задача</option><option value="meeting" ${preset.type === "meeting" ? "selected" : ""}>Встреча</option><option value="shoot" ${preset.type === "shoot" ? "selected" : ""}>Съёмка</option><option value="deadline" ${preset.type === "deadline" ? "selected" : ""}>Дедлайн</option></select></div>
      <div class="form-row form-row--wide"><label>Описание</label><textarea name="description" class="textarea">${preset.description || ""}</textarea></div>
      <div class="form-row form-row--wide inline-actions"><button class="btn btn--green">Сохранить событие</button><button class="btn" type="button" data-close-modal>${(preset.returnToProjectId || preset.editEventId) ? "Закрыть" : "Отменить"}</button></div>
    </form>`, (preset.returnToProjectId || preset.editEventId) ? {
    backAction: () => {
      if (preset.editEventId) {
        openEventDetails(preset.editEventId, preset.sourceProjectId || preset.returnToProjectId || "", preset.sourceProjectScrollTop || 0);
        return;
      }
      if (preset.returnToProjectId) openProjectDetails(preset.returnToProjectId, { scrollTop: preset.sourceProjectScrollTop || 0 });
    }
  } : {});
  const allDayToggle = byId("event-all-day");
  const startField = document.querySelector('#event-form input[name="start"]');
  const endField = document.querySelector('#event-form input[name="end"]');
  const projectSelect = byId("event-project-select");
  const performerSelect = byId("event-performer-select");
  const eventForm = byId("event-form");
  allDayToggle.checked = Boolean(preset.allDay);
  const syncEventPerformers = () => {
    const selectedProject = projectById(projectSelect.value);
    const allowed = new Set(selectedProject?.performers || state.performers.map((performer) => performer.id));
    [...performerSelect.options].forEach((option) => {
      if (!option.value) return;
      option.hidden = projectSelect.value ? !allowed.has(option.value) : false;
    });
    if (projectSelect.value && performerSelect.value && !allowed.has(performerSelect.value)) performerSelect.value = "";
  };
  setupTimePairSync(eventForm, "start", "end", 60);
  const syncAllDayFields = () => {
    const disabled = allDayToggle.checked;
    startField.disabled = disabled;
    endField.disabled = disabled;
    if (disabled) {
      startField.value = "00:00";
      endField.value = "23:59";
    } else if (startField.value === "00:00" && endField.value === "23:59") {
      startField.value = "10:00";
      endField.value = "13:00";
    }
  };
  projectSelect.addEventListener("change", syncEventPerformers);
  syncEventPerformers();
  allDayToggle.addEventListener("change", syncAllDayFields);
  syncAllDayFields();
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const isAllDay = data.allDay === "on";
    const startTime = isAllDay ? "00:00" : data.start;
    const endTime = isAllDay ? "23:59" : data.end;
    const nextEvent = { title: data.title, description: data.description, startDateTime: `${data.date}T${startTime}`, endDateTime: `${data.date}T${endTime}`, allDay: isAllDay, projectId: data.projectId, performerId: data.performerId, status: data.status, priority: data.priority, type: data.type };
    if (isEdit) saveCalendarEventUpdate(preset.editEventId, nextEvent);
    else {
      state.events.push({ id: uid("ev"), ...nextEvent });
      saveState();
    }
    if (preset.returnToProjectId) {
      openProjectDetails(preset.returnToProjectId, { scrollTop: preset.sourceProjectScrollTop || 0 });
      return;
    }
    if (preset.editEventId) {
      rerenderCurrentPage();
      openEventDetails(preset.editEventId, preset.sourceProjectId || "", preset.sourceProjectScrollTop || 0);
      return;
    }
    closeModal();
    if (document.body.dataset.page === "calendar") renderCalendar();
    else rerenderCurrentPage();
  });
}
function openProjectTaskForm(projectId) {
  const project = projectById(projectId);
  openEventForm(project?.draftDeadline || project?.startDate || localISODate(), {
    projectId,
    type: "task",
    status: "Запланировано",
    priority: "Средний",
    returnToProjectId: projectId,
    sourceProjectId: projectId,
    sourceProjectScrollTop: currentModalScrollTop()
  });
}

function renderMapPage() {
  byId("map-status").innerHTML = `<option value="">Все статусы</option>${[...new Set(state.projects.map((p) => p.status))].map((status) => `<option>${status}</option>`).join("")}`;
  setupDatePairSync(document, "map-date-start", "map-date-end");
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
function addDaysToISO(value, days = 0) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return localISODate(date);
}
function setupDatePairSync(root, startName, endName, options = {}) {
  const start = root?.querySelector(`[name="${startName}"]`);
  const end = root?.querySelector(`[name="${endName}"]`);
  if (!start || !end) return;
  const offset = Number(options.offsetDays || 0);
  const sync = () => {
    if (!start.value) return;
    const next = addDaysToISO(start.value, offset);
    end.min = start.value;
    if (!end.value || end.value < start.value) {
      end.value = next;
      end.dispatchEvent(new Event("input", { bubbles: true }));
      end.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };
  start.addEventListener("change", sync);
  start.addEventListener("input", sync);
  sync();
}
function setupTimePairSync(root, startName = "start", endName = "end", minutes = 60) {
  const start = root?.querySelector(`[name="${startName}"]`);
  const end = root?.querySelector(`[name="${endName}"]`);
  if (!start || !end) return;
  const sync = () => {
    if (!start.value) return;
    const [hours, mins] = start.value.split(":").map(Number);
    const total = Math.min(23 * 60 + 59, hours * 60 + mins + minutes);
    const next = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
    if (!end.value || end.value <= start.value) end.value = next;
    end.min = start.value;
  };
  start.addEventListener("change", sync);
  start.addEventListener("input", sync);
  sync();
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
    performers: {
      sheet: "Исполнители",
      rows: state.performers.map((performer) => ({
        "ID": performer.id,
        "Имя": performer.name,
        "Роль": performer.role,
        "Email": performer.email,
        "Пароль": performer.password,
        "Ставка": performer.rate,
        "Проектов в работе": performer.activeProjectsCount,
        "Завершённых проектов": performer.completedProjectsCount,
        "Ближайший дедлайн": performer.nearestDeadline,
        "Статус": performer.status,
        "Контакты": performer.contacts,
        "Заметка": performer.notes || ""
      }))
    },
    projects: {
      sheet: "Проекты",
      rows: state.projects.map((project) => ({
        "ID": project.id,
        "Название проекта": project.title,
        "Клиент": project.client,
        "Описание": project.description,
        "Статус": project.status,
        "Дата начала": project.startDate,
        "Дедлайн черновика": project.draftDeadline,
        "Дедлайн чистовика": project.finalDeadline,
        "Съёмочные даты": (project.shootingDates || []).map((date) => `${date.start} - ${date.end}`).join("; "),
        "Локация": project.location,
        "Координаты": (project.coordinates || []).join(", "),
        "Исполнители": project.performers.map((id) => performerById(id)?.name).join(", "),
        "Согласованный бюджет": project.clientPayment,
        "Получено оплат": projectIncome(project),
        "График оплат": (project.payments || []).map((payment) => `${payment.date} · ${payment.method} · ${payment.amount}`).join("; "),
        "Расходы": projectExpenses(project),
        "Прибыль": project.profit,
        "Маржинальность, %": projectMargin(project),
        "Архивирован": isArchivedProject(project) ? "Да" : "Нет"
      }))
    },
    finances: {
      sheet: "Финансы",
      rows: state.projects.map((project) => ({
        "Проект": project.title,
        "Клиент": project.client,
        "Бюджет": project.clientPayment,
        "Получено": projectIncome(project),
        "Расходы": projectExpenses(project),
        "Прибыль": project.profit,
        "Маржинальность, %": projectMargin(project)
      }))
    },
    expenses: {
      sheet: "Расходы",
      rows: allExpenses().map((expense) => ({
        "ID": expense.id,
        "Тип": expense.type === "general" ? "Общая трата" : expense.type === "equipment" ? "Аренда техники" : "Проектная трата",
        "Проект": projectById(expense.projectId)?.title || "Без проекта",
        "Категория": expense.category,
        "Название": expense.title,
        "Сумма": expense.amount,
        "Дата начисления": expense.date,
        "Дата выплаты": expense.paidAt,
        "Способ оплаты": expense.paymentMethod,
        "Комментарий": expense.comment,
        "Чек / документ": expense.receiptFile || ""
      }))
    },
    documents: {
      sheet: "Документы",
      rows: state.documents.map((documentItem) => ({
        "ID": documentItem.id,
        "Тип документа": documentItem.type,
        "Проект": projectById(documentItem.projectId)?.title || "Без проекта",
        "Название": documentItem.title,
        "Сумма": documentItem.amount,
        "Дата": documentItem.date,
        "PDF-файл": documentItem.pdfFile || "",
        "Чек": documentItem.receiptFile || "",
        "Ссылка Мой налог": documentItem.myTaxLink || "",
        "Комментарий": documentItem.comment || ""
      }))
    },
    equipment: {
      sheet: "Оборудование",
      rows: state.projects.flatMap((project) => (project.equipment || []).map((equipment) => ({
        "Проект": project.title,
        "ID": equipment.id,
        "Название": equipment.name,
        "Категория": equipment.category,
        "Количество": equipment.quantity,
        "Цена за единицу": equipment.pricePerUnit,
        "Дней аренды": equipment.rentalDays,
        "Итоговая стоимость": equipment.totalPrice,
        "Чек / договор": equipment.receiptFile || ""
      })))
    },
    map: {
      sheet: "Карта",
      rows: mapPoints().map((point) => ({
        "ID": point.id,
        "Проект": point.title,
        "Клиент": point.client,
        "Локация": point.location,
        "Координаты": point.coordinates.join(", "),
        "Начало съёмок": point.shootingDateStart,
        "Конец съёмок": point.shootingDateEnd,
        "Съёмочных дней": point.shootingDaysCount,
        "Статус": point.status
      }))
    }
  };
  const dataset = datasets[type] || { sheet: type, rows: [] };
  const data = dataset.rows;
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, dataset.sheet);
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
window.removeProjectPerformer = removeProjectPerformer;
window.openProjectPaymentEdit = openProjectPaymentEdit;
window.openProjectExpenseEdit = openProjectExpenseEdit;
window.openProjectEquipmentEdit = openProjectEquipmentEdit;
window.archiveProject = archiveProject;
window.restoreProject = restoreProject;
window.openCalendarDay = openCalendarDay;
window.openEventFromDayGrid = openEventFromDayGrid;
window.openEventForm = openEventForm;
window.openEventDetails = openEventDetails;
window.openEventEditForm = openEventEditForm;
window.markEventDone = markEventDone;
window.openProjectTaskForm = openProjectTaskForm;
window.openCalendarPerformerAssign = openCalendarPerformerAssign;
