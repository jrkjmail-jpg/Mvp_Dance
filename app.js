const POSE_MODEL_SOURCES = [
  {
    name: "Heavy",
    url: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task",
  },
  {
    name: "Full",
    url: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task",
  },
];
const TASKS_VISION_SOURCES = [
  {
    module: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35",
    wasm: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",
  },
  {
    module: "https://unpkg.com/@mediapipe/tasks-vision@0.10.35",
    wasm: "https://unpkg.com/@mediapipe/tasks-vision@0.10.35/wasm",
  },
];

const teacherVideo = document.querySelector("#teacherVideo");
const studentVideo = document.querySelector("#studentVideo");
const teacherCanvas = document.querySelector("#teacherCanvas");
const studentCanvas = document.querySelector("#studentCanvas");
const teacherCtx = teacherCanvas.getContext("2d");
const studentCtx = studentCanvas.getContext("2d");

const els = {
  appShell: document.querySelector(".app-shell"),
  brandHomeButton: document.querySelector("#brandHomeButton"),
  accountMenu: document.querySelector(".account-menu"),
  accountNavButtons: document.querySelectorAll("[data-account-target]"),
  learningUpload: document.querySelector("#learningUpload"),
  examUpload: document.querySelector("#examUpload"),
  learningUploadStatus: document.querySelector("#learningUploadStatus"),
  examUploadStatus: document.querySelector("#examUploadStatus"),
  teacherUploadLabel: document.querySelector("#teacherUploadLabel"),
  learningPreviewVideo: document.querySelector("#learningPreviewVideo"),
  examPreviewVideo: document.querySelector("#examPreviewVideo"),
  showLearningVideoButton: document.querySelector("#showLearningVideoButton"),
  showExamVideoButton: document.querySelector("#showExamVideoButton"),
  startDanceCardButton: document.querySelector("#startDanceCardButton"),
  settingsButton: document.querySelector("#settingsButton"),
  settingsOverlay: document.querySelector("#settingsOverlay"),
  settingsCloseButton: document.querySelector("#settingsCloseButton"),
  settingsViewButtons: document.querySelectorAll("[data-settings-view]"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  editDancerProfileButton: document.querySelector("#editDancerProfileButton"),
  studentEditOverlay: document.querySelector("#studentEditOverlay"),
  studentEditForm: document.querySelector("#studentEditForm"),
  studentEditCancel: document.querySelector("#studentEditCancel"),
  studentEditFirstName: document.querySelector("#studentEditFirstName"),
  studentEditLastName: document.querySelector("#studentEditLastName"),
  studentEditNickname: document.querySelector("#studentEditNickname"),
  studentEditAge: document.querySelector("#studentEditAge"),
  studentEditStyleOptions: document.querySelector("#studentEditStyleOptions"),
  pipelineSteps: document.querySelectorAll(".pipeline-step"),
  lessonFlowSteps: document.querySelectorAll(".flow-step"),
  studentPanel: document.querySelector('[data-panel="student"]'),
  teacherPanel: document.querySelector('[data-panel="teacher"]'),
  cameraButton: document.querySelector("#cameraButton"),
  studentVideoUpload: document.querySelector("#studentVideoUpload"),
  studentPlayButton: document.querySelector("#studentPlayButton"),
  studentSeekRange: document.querySelector("#studentSeekRange"),
  studentVideoTime: document.querySelector("#studentVideoTime"),
  markStudentStartButton: document.querySelector("#markStudentStartButton"),
  markStudentEndButton: document.querySelector("#markStudentEndButton"),
  buildStudentSkeletonButton: document.querySelector("#buildStudentSkeletonButton"),
  studentStartMarkerTick: document.querySelector("#studentStartMarkerTick"),
  studentEndMarkerTick: document.querySelector("#studentEndMarkerTick"),
  teacherPlayButton: document.querySelector("#teacherPlayButton"),
  teacherSeekRange: document.querySelector("#teacherSeekRange"),
  markExamStartButton: document.querySelector("#markExamStartButton"),
  markExamEndButton: document.querySelector("#markExamEndButton"),
  previewExamButton: document.querySelector("#previewExamButton"),
  reviewSkeletonButton: document.querySelector("#reviewSkeletonButton"),
  practiceButton: document.querySelector("#practiceButton"),
  danceButton: document.querySelector("#danceButton"),
  studentStepNextButton: document.querySelector("#studentStepNextButton"),
  studentExamSubmitButton: document.querySelector("#studentExamSubmitButton"),
  studentRetakeStepButton: document.querySelector("#studentRetakeStepButton"),
  speedRange: document.querySelector("#speedRange"),
  speedValue: document.querySelector("#speedValue"),
  segmentRange: document.querySelector("#segmentRange"),
  segmentValue: document.querySelector("#segmentValue"),
  mirrorToggle: document.querySelector("#mirrorToggle"),
  modelStatus: document.querySelector("#modelStatus"),
  scanStatus: document.querySelector("#scanStatus"),
  teacherEmpty: document.querySelector("#teacherEmpty"),
  teacherScanOverlay: document.querySelector("#teacherScanOverlay"),
  scanProgressValue: document.querySelector("#scanProgressValue"),
  scanOverlayText: document.querySelector("#scanOverlayText"),
  teacherVideoToggle: document.querySelector("#teacherVideoToggle"),
  teacherSkeletonToggle: document.querySelector("#teacherSkeletonToggle"),
  studentEmpty: document.querySelector("#studentEmpty"),
  scoreValue: document.querySelector("#scoreValue"),
  levelNameValue: document.querySelector("#levelNameValue"),
  levelProgressBar: document.querySelector("#levelProgressBar"),
  levelNextValue: document.querySelector("#levelNextValue"),
  studentStarsBadge: document.querySelector("#studentStarsBadge"),
  studentOnboarding: document.querySelector("#studentOnboarding"),
  studentAccountContent: document.querySelector("#studentAccountContent"),
  studentProfileForm: document.querySelector("#studentProfileForm"),
  studentFirstName: document.querySelector("#studentFirstName"),
  studentLastName: document.querySelector("#studentLastName"),
  studentNickname: document.querySelector("#studentNickname"),
  studentAge: document.querySelector("#studentAge"),
  studentConsent: document.querySelector("#studentConsent"),
  studentStyleOptions: document.querySelector("#studentStyleOptions"),
  studentInviteStudioName: document.querySelector("#studentInviteStudioName"),
  studentStudioName: document.querySelector("#studentStudioName"),
  studentProfileName: document.querySelector("#studentProfileName"),
  matchValue: document.querySelector("#matchValue"),
  matchLabel: document.querySelector("#matchLabel"),
  matchArc: document.querySelector("#matchArc"),
  armsMeter: document.querySelector("#armsMeter"),
  legsMeter: document.querySelector("#legsMeter"),
  bodyMeter: document.querySelector("#bodyMeter"),
  chestMeter: document.querySelector("#chestMeter"),
  headMeter: document.querySelector("#headMeter"),
  fingersMeter: document.querySelector("#fingersMeter"),
  positionMeter: document.querySelector("#positionMeter"),
  timeMeter: document.querySelector("#timeMeter"),
  taskStatus: document.querySelector("#taskStatus"),
  attemptCount: document.querySelector("#attemptCount"),
  attemptList: document.querySelector("#attemptList"),
  learningRangeValue: document.querySelector("#learningRangeValue"),
  examRangeValue: document.querySelector("#examRangeValue"),
  examStartValue: document.querySelector("#examStartValue"),
  examEndValue: document.querySelector("#examEndValue"),
  teacherVideoModeLabel: document.querySelector("#teacherVideoModeLabel"),
  currentVideoTime: document.querySelector("#currentVideoTime"),
  startMarkerTick: document.querySelector("#startMarkerTick"),
  endMarkerTick: document.querySelector("#endMarkerTick"),
  reviewStatus: document.querySelector("#reviewStatus"),
  buildReferenceButton: document.querySelector("#buildReferenceButton"),
  teacherRebuildReferenceButton: document.querySelector("#teacherRebuildReferenceButton"),
  teacherStepEyebrow: document.querySelector("#teacherStepEyebrow"),
  teacherStepTitle: document.querySelector("#teacherStepTitle"),
  teacherStepDescription: document.querySelector("#teacherStepDescription"),
  teacherStepHint: document.querySelector("#teacherStepHint"),
  teacherStepNextButton: document.querySelector("#teacherStepNextButton"),
  publishLessonButton: document.querySelector("#publishLessonButton"),
  countdownOverlay: document.querySelector("#countdownOverlay"),
  countdownValue: document.querySelector("#countdownValue"),
  countdownHint: document.querySelector("#countdownHint"),
  resultOverlay: document.querySelector("#resultOverlay"),
  resultStars: document.querySelector("#resultStars"),
  resultTitle: document.querySelector("#resultTitle"),
  resultDetails: document.querySelector("#resultDetails"),
  mistakeList: document.querySelector("#mistakeList"),
  showMistakesButton: document.querySelector("#showMistakesButton"),
  resultLevelBadge: document.querySelector("#resultLevelBadge"),
  resultLevelName: document.querySelector("#resultLevelName"),
  resultCloseButton: document.querySelector("#resultCloseButton"),
  retakeButton: document.querySelector("#retakeButton"),
  levelCardButton: document.querySelector("#levelCardButton"),
  levelOverlay: document.querySelector("#levelOverlay"),
  levelOverlayDetails: document.querySelector("#levelOverlayDetails"),
  studentProfileDetails: document.querySelector("#studentProfileDetails"),
  studentProfileCoverInput: document.querySelector("#studentProfileCoverInput"),
  studentProfileAvatarInput: document.querySelector("#studentProfileAvatarInput"),
  levelHistoryOverlay: document.querySelector("#levelHistoryOverlay"),
  levelHistoryList: document.querySelector("#levelHistoryList"),
  levelHistoryCloseButton: document.querySelector("#levelHistoryCloseButton"),
  levelOverlayCloseButton: document.querySelector("#levelOverlayCloseButton"),
  studentStudioProfilePage: document.querySelector("#studentStudioProfilePage"),
  studentStudioProfileCoverImage: document.querySelector("#studentStudioProfileCoverImage"),
  studentStudioProfileLogo: document.querySelector("#studentStudioProfileLogo"),
  studentStudioProfileTitle: document.querySelector("#studentStudioProfileTitle"),
  studentStudioProfileDescription: document.querySelector("#studentStudioProfileDescription"),
  studentStudioProfileFacts: document.querySelector("#studentStudioProfileFacts"),
  studentStudioAchievementsList: document.querySelector("#studentStudioAchievementsList"),
  studentStudioMaterialsBreadcrumb: document.querySelector("#studentStudioMaterialsBreadcrumb"),
  studentStudioMaterialsTitle: document.querySelector("#studentStudioMaterialsTitle"),
  studentStudioMaterialsPath: document.querySelector("#studentStudioMaterialsPath"),
  studentStudioMaterialsBack: document.querySelector("#studentStudioMaterialsBack"),
  studentStudioMaterialsList: document.querySelector("#studentStudioMaterialsList"),
  studentStudioBackButton: document.querySelector("#studentStudioBackButton"),
  teacherBreadcrumb: document.querySelector("#teacherBreadcrumb"),
  teacherFolderTitle: document.querySelector("#teacherFolderTitle"),
  teacherBackButton: document.querySelector("#teacherBackButton"),
  teacherEditAction: document.querySelector("#teacherEditAction"),
  teacherSubgroupAction: document.querySelector("#teacherSubgroupAction"),
  teacherPrimaryAction: document.querySelector("#teacherPrimaryAction"),
  teacherFolderViews: document.querySelectorAll("[data-teacher-view]"),
  teacherBrowser: document.querySelector("[data-teacher-browser]"),
  teacherRootEmpty: document.querySelector("#teacherRootEmpty"),
  teacherStudioList: document.querySelector("#teacherStudioList"),
  teacherGroupList: document.querySelector("#teacherGroupList"),
  teacherLessonList: document.querySelector("#teacherLessonList"),
  teacherSpaceEyebrow: document.querySelector("#teacherSpaceEyebrow"),
  teacherSpaceTitle: document.querySelector("#teacherSpaceTitle"),
  teacherLessonOpenTitle: document.querySelector("#teacherLessonOpenTitle"),
  teacherStudioChannel: document.querySelector("#teacherStudioChannel"),
  teacherStudioCover: document.querySelector("#teacherStudioCover"),
  teacherStudioCoverImage: document.querySelector("#teacherStudioCoverImage"),
  teacherStudioLogo: document.querySelector("#teacherStudioLogo"),
  teacherStudioLogoLetter: document.querySelector("#teacherStudioLogoLetter"),
  teacherStudioCoverEdit: document.querySelector("#teacherStudioCoverEdit"),
  teacherStudioLogoEdit: document.querySelector("#teacherStudioLogoEdit"),
  teacherStudioCoverInput: document.querySelector("#teacherStudioCoverInput"),
  teacherStudioLogoInput: document.querySelector("#teacherStudioLogoInput"),
  teacherStudioChannelName: document.querySelector("#teacherStudioChannelName"),
  teacherStudioChannelDescription: document.querySelector("#teacherStudioChannelDescription"),
  teacherStudioChannelAddress: document.querySelector("#teacherStudioChannelAddress"),
  teacherStudioChannelLink: document.querySelector("#teacherStudioChannelLink"),
  teacherStudioDirections: document.querySelector("#teacherStudioDirections"),
  teacherStudioAchievementsList: document.querySelector("#teacherStudioAchievementsList"),
  teacherInviteButton: document.querySelector("#teacherInviteButton"),
  teacherInviteOverlay: document.querySelector("#teacherInviteOverlay"),
  teacherInviteForm: document.querySelector("#teacherInviteForm"),
  teacherInviteFirstName: document.querySelector("#teacherInviteFirstName"),
  teacherInviteLastName: document.querySelector("#teacherInviteLastName"),
  teacherInviteGroup: document.querySelector("#teacherInviteGroup"),
  teacherInviteContact: document.querySelector("#teacherInviteContact"),
  teacherInviteNote: document.querySelector("#teacherInviteNote"),
  teacherInviteResult: document.querySelector("#teacherInviteResult"),
  teacherInviteLink: document.querySelector("#teacherInviteLink"),
  teacherInviteCancel: document.querySelector("#teacherInviteCancel"),
  studioLibraryTabs: document.querySelectorAll("[data-studio-library-tab]"),
  studioLibraryPanels: document.querySelectorAll("[data-studio-library-panel]"),
  teacherStudentList: document.querySelector("#teacherStudentList"),
  teacherStudentProfileOverlay: document.querySelector("#teacherStudentProfileOverlay"),
  teacherStudentProfileTitle: document.querySelector("#teacherStudentProfileTitle"),
  teacherStudentProfileBody: document.querySelector("#teacherStudentProfileBody"),
  teacherStudentProfileClose: document.querySelector("#teacherStudentProfileClose"),
  teacherCreateOverlay: document.querySelector("#teacherCreateOverlay"),
  teacherCreateForm: document.querySelector("#teacherCreateForm"),
  teacherCreateEyebrow: document.querySelector("#teacherCreateEyebrow"),
  teacherCreateTitle: document.querySelector("#teacherCreateTitle"),
  teacherCreateNameLabel: document.querySelector("#teacherCreateNameLabel"),
  teacherCreateName: document.querySelector("#teacherCreateName"),
  teacherCreateDescription: document.querySelector("#teacherCreateDescription"),
  teacherCreateCategoryField: document.querySelector("#teacherCreateCategoryField"),
  teacherCreateCategory: document.querySelector("#teacherCreateCategory"),
  teacherStudioCreateFields: document.querySelector("#teacherStudioCreateFields"),
  teacherCreateLogo: document.querySelector("#teacherCreateLogo"),
  teacherCreateCover: document.querySelector("#teacherCreateCover"),
  teacherCreateAddress: document.querySelector("#teacherCreateAddress"),
  teacherCreateDirections: document.querySelector("#teacherCreateDirections"),
  teacherCreateLink: document.querySelector("#teacherCreateLink"),
  teacherCreateCancel: document.querySelector("#teacherCreateCancel"),
  teacherEditOverlay: document.querySelector("#teacherEditOverlay"),
  teacherEditForm: document.querySelector("#teacherEditForm"),
  teacherEditEyebrow: document.querySelector("#teacherEditEyebrow"),
  teacherEditTitle: document.querySelector("#teacherEditTitle"),
  teacherEditImage: document.querySelector("#teacherEditImage"),
  teacherEditImageLabel: document.querySelector("#teacherEditImageLabel"),
  teacherEditCoverField: document.querySelector("#teacherEditCoverField"),
  teacherEditCover: document.querySelector("#teacherEditCover"),
  teacherEditName: document.querySelector("#teacherEditName"),
  teacherEditDescription: document.querySelector("#teacherEditDescription"),
  teacherEditCategoryField: document.querySelector("#teacherEditCategoryField"),
  teacherEditCategory: document.querySelector("#teacherEditCategory"),
  teacherEditAgeLabel: document.querySelector("#teacherEditAgeLabel"),
  teacherEditAge: document.querySelector("#teacherEditAge"),
  teacherEditPlaceLabel: document.querySelector("#teacherEditPlaceLabel"),
  teacherEditPlace: document.querySelector("#teacherEditPlace"),
  teacherEditContact: document.querySelector("#teacherEditContact"),
  teacherStudioAchievementsField: document.querySelector("#teacherStudioAchievementsField"),
  teacherEditAchievements: document.querySelector("#teacherEditAchievements"),
  teacherAchievementItems: document.querySelector("#teacherAchievementItems"),
  teacherAchievementAddToggle: document.querySelector("#teacherAchievementAddToggle"),
  teacherAchievementForm: document.querySelector("#teacherAchievementForm"),
  teacherAchievementIcon: document.querySelector("#teacherAchievementIcon"),
  teacherAchievementTitle: document.querySelector("#teacherAchievementTitle"),
  teacherAchievementNote: document.querySelector("#teacherAchievementNote"),
  teacherAchievementAddButton: document.querySelector("#teacherAchievementAddButton"),
  teacherEditAchievementImage: document.querySelector("#teacherEditAchievementImage"),
  teacherEditCancel: document.querySelector("#teacherEditCancel"),
};

const BONES = [
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
  [11, 23],
  [12, 24],
  [23, 24],
  [23, 25],
  [25, 27],
  [24, 26],
  [26, 28],
  [27, 31],
  [28, 32],
];

const DANCE_STYLES = [
  "Hip-hop",
  "Jazz-funk",
  "Contemporary",
  "House",
  "Breaking",
  "Dancehall",
  "Vogue",
  "Waacking",
  "Popping",
  "Locking",
  "Krump",
  "High heels",
  "K-pop",
  "Afro",
  "Балет",
  "Эстрадный танец",
  "Народный танец",
  "Бальные танцы",
  "Акробатика",
  "Фристайл",
];

const savedTeacherWorkspace = readStoredJson("danceReplayTeacherWorkspace", null);
const savedStudentProfile = readStoredJson("danceReplayStudentProfile", null);
const savedTheme = readStoredTheme();

const ANGLES = {
  arms: [
    [11, 13, 15],
    [12, 14, 16],
    [13, 11, 23],
    [14, 12, 24],
  ],
  legs: [
    [23, 25, 27],
    [24, 26, 28],
    [11, 23, 25],
    [12, 24, 26],
  ],
  body: [
    [11, 23, 24],
    [12, 24, 23],
    [23, 11, 13],
    [24, 12, 14],
  ],
  chest: [
    [23, 11, 12],
    [24, 12, 11],
    [11, 12, 24],
    [12, 11, 23],
  ],
  head: [
    [7, 0, 8],
    [11, 0, 12],
    [0, 11, 23],
    [0, 12, 24],
  ],
  fingers: [
    [17, 15, 19],
    [19, 15, 21],
    [18, 16, 20],
    [20, 16, 22],
  ],
};

const LEVELS = [
  { level: 1, stars: 0, name: "Новичок" },
  { level: 2, stars: 5, name: "Разучиваю шаги" },
  { level: 3, stars: 12, name: "Повторяю движения" },
  { level: 4, stars: 20, name: "Попадаю в ритм" },
  { level: 5, stars: 30, name: "Уверенный старт" },
  { level: 6, stars: 42, name: "Стараюсь лучше" },
  { level: 7, stars: 56, name: "Держу темп" },
  { level: 8, stars: 72, name: "Запоминаю танец" },
  { level: 9, stars: 90, name: "Танцую смелее" },
  { level: 10, stars: 110, name: "Молодец" },
  { level: 11, stars: 132, name: "Хороший результат" },
  { level: 12, stars: 156, name: "Танцую уверенно" },
  { level: 13, stars: 182, name: "Почти без ошибок" },
  { level: 14, stars: 210, name: "Красивые движения" },
  { level: 15, stars: 240, name: "Отличный прогресс" },
  { level: 16, stars: 272, name: "Сильный танцор" },
  { level: 17, stars: 306, name: "Точный ритм" },
  { level: 18, stars: 342, name: "Чистый танец" },
  { level: 19, stars: 380, name: "Очень хорошо" },
  { level: 20, stars: 420, name: "Звезда группы" },
  { level: 21, stars: 465, name: "Лучший результат" },
  { level: 22, stars: 515, name: "Танцую как артист" },
  { level: 23, stars: 570, name: "Готов к выступлению" },
  { level: 24, stars: 630, name: "Настоящий артист" },
  { level: 25, stars: 695, name: "Гордость педагога" },
  { level: 26, stars: 765, name: "Почти чемпион" },
  { level: 27, stars: 840, name: "Чемпион тренировки" },
  { level: 28, stars: 920, name: "Суперзвезда" },
  { level: 29, stars: 1005, name: "Легенда студии" },
  { level: 30, stars: 1100, name: "Главная звезда" },
];

const POSITION_POINTS = [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28, 31, 32];
const HIDDEN_FACE_POINTS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const HIDDEN_HAND_POINTS = new Set([17, 18, 19, 20, 21, 22]);
const REFERENCE_SCAN_FPS = 30;
const DEFAULT_STUDIO_ACHIEVEMENTS = [
  { icon: "🏆", title: "Фестивали", note: "Участники и призёры" },
  { icon: "🎓", title: "Дипломы", note: "Лауреаты конкурсов" },
  { icon: "★", title: "Рост учеников", note: "Уровни и звёзды" },
];

const state = {
  teacherLandmarker: null,
  liveLandmarker: null,
  reference: [],
  mode: "idle",
  cameraReady: false,
  lastVideoTime: -1,
  score: 0,
  bestMatch: 0,
  currentMatch: 0,
  startedAt: 0,
  studentRecording: [],
  lastRecordAt: -1,
  recordingEnd: 0,
  activeTeacherVideo: "exam",
  learning: {
    objectUrl: "",
    duration: 0,
    start: 0,
    end: 0,
    startSet: false,
    endSet: false,
  },
  exam: {
    objectUrl: "",
    fileName: "",
    fileSize: 0,
    duration: 0,
    start: 0,
    end: 0,
    startSet: false,
    endSet: false,
  },
  countdownToken: 0,
  pendingExamScan: false,
  studentVideoObjectUrl: "",
  studentVideoFileName: "",
  studentVideoFileSize: 0,
  studentSkeleton: [],
  studentScanId: 0,
  teacherFolderView: savedTeacherWorkspace?.studios?.length ? "studio" : "root",
  teacherCreateType: "",
  teacherEditImageData: "",
  teacherEditCoverData: "",
  teacherEditAchievementsList: [],
  teacherStudioLibraryTab: "lessons",
  teacherStudentGroupId: "",
  studentStudioGroupOpen: false,
  studentStudioSubgroupIds: [],
  teacherWorkspace: savedTeacherWorkspace || {
    studios: [],
    activeStudioId: "",
    activeGroupId: "",
    activeSubgroupIds: [],
    activeLessonId: "",
  },
  studentProfile: savedStudentProfile,
  studentClip: {
    duration: 0,
    start: 0,
    end: 0,
    startSet: false,
    endSet: false,
  },
  lastResult: null,
  lastAttempt: null,
  studentLessonStep: "practice",
  modelLoading: false,
  modelFailed: false,
  poseModelName: "",
  modelReadyPromise: null,
  attempts: JSON.parse(localStorage.getItem("danceReplayAttempts") || "[]"),
  scanId: 0,
  raf: 0,
  videoFrameCallbackId: 0,
};

window.__danceModuleReady = true;
window.__danceDebug = {
  state: () => ({
    activeTeacherVideo: state.activeTeacherVideo,
    mode: state.mode,
    pendingExamScan: state.pendingExamScan,
    referenceFrames: state.reference.length,
    hasTeacherLandmarker: Boolean(state.teacherLandmarker),
    hasLiveLandmarker: Boolean(state.liveLandmarker),
    modelLoading: state.modelLoading,
    modelFailed: state.modelFailed,
    poseModelName: state.poseModelName,
    exam: {
      hasVideo: Boolean(state.exam.objectUrl),
      duration: state.exam.duration,
      start: state.exam.start,
      end: state.exam.end,
    },
    teacherVideo: {
      hasSrc: Boolean(teacherVideo.currentSrc || teacherVideo.src),
      duration: teacherVideo.duration,
      currentTime: teacherVideo.currentTime,
      readyState: teacherVideo.readyState,
      paused: teacherVideo.paused,
    },
    statuses: {
      model: els.modelStatus.textContent,
      scan: els.scanStatus.textContent,
      review: els.reviewStatus.textContent,
      examUpload: els.examUploadStatus.textContent,
    },
  }),
};

const isUiTestMode = new URLSearchParams(window.location.search).has("ui-test");
setButtons(isUiTestMode);
applyTheme(savedTheme);
renderAttempts();
updateLevelDisplay();
updateExamMarker();
updatePipeline("upload");
updateLessonFlow("choose");
normalizeTeacherWorkspace();
renderStudentProfile();
renderTeacherStudentProgress();
setTeacherFolderView(state.teacherWorkspace.studios.length ? "studio" : "root");
switchView("student");
if (!isUiTestMode) initPose();

els.learningUpload.addEventListener("click", resetFileInputBeforePick);
els.examUpload.addEventListener("click", resetFileInputBeforePick);
els.learningUpload.addEventListener("change", (event) => onTeacherUpload(event, "learning"));
els.examUpload.addEventListener("change", (event) => onTeacherUpload(event, "exam"));
els.showLearningVideoButton.addEventListener("click", () => switchTeacherVideo("learning"));
els.showExamVideoButton.addEventListener("click", () => switchTeacherVideo("exam"));
els.startDanceCardButton.addEventListener("click", focusDanceStage);
els.brandHomeButton.addEventListener("click", goStudentHome);
els.brandHomeButton.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  goStudentHome();
});
els.accountNavButtons.forEach((button) => button.addEventListener("click", () => {
  openAccountTarget(button.dataset.accountTarget);
  button.blur();
}));
els.accountMenu?.addEventListener("mouseleave", () => {
  if (els.accountMenu.contains(document.activeElement)) {
    document.activeElement.blur();
  }
});
els.settingsButton.addEventListener("click", openSettings);
els.settingsCloseButton.addEventListener("click", closeSettings);
els.settingsOverlay.addEventListener("click", (event) => {
  if (event.target === els.settingsOverlay) closeSettings();
});
els.settingsViewButtons.forEach((button) => button.addEventListener("click", () => {
  const view = button.dataset.settingsView;
  switchView(view);
  closeSettings();
}));
els.themeToggleButton.addEventListener("click", toggleTheme);
els.editDancerProfileButton?.addEventListener("click", () => {
  closeSettings();
  openCurrentCabinetEditor();
});
els.studentEditForm?.addEventListener("submit", submitStudentEditDialog);
els.studentEditCancel?.addEventListener("click", closeStudentEditDialog);
els.studentEditOverlay?.addEventListener("click", (event) => {
  if (event.target === els.studentEditOverlay) closeStudentEditDialog();
});
els.studentProfileForm.addEventListener("submit", submitStudentProfile);
els.teacherBrowser.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-folder-type]");
  if (deleteButton) {
    event.preventDefault();
    event.stopPropagation();
    deleteTeacherFolderItem(deleteButton.dataset.deleteFolderType || "", deleteButton.dataset.deleteFolderId || "");
    return;
  }
  const createButton = event.target.closest("[data-create-type]");
  if (createButton) {
    openTeacherCreateDialog(createButton.dataset.createType || "");
    return;
  }
  const studioButton = event.target.closest("[data-studio-id]");
  if (studioButton) {
    state.teacherWorkspace.activeStudioId = studioButton.dataset.studioId;
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeSubgroupIds = [];
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("studio");
    return;
  }
  const groupButton = event.target.closest("[data-group-id]");
  if (groupButton) {
    state.teacherWorkspace.activeGroupId = groupButton.dataset.groupId;
    state.teacherWorkspace.activeSubgroupIds = [];
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("group");
    return;
  }
  const subgroupButton = event.target.closest("[data-subgroup-id]");
  if (subgroupButton) {
    if (state.teacherWorkspace.activeSubgroupIds.length >= 3) return;
    state.teacherWorkspace.activeSubgroupIds.push(subgroupButton.dataset.subgroupId);
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("group");
    return;
  }
  const lessonButton = event.target.closest("[data-lesson-id]");
  if (lessonButton) {
    state.teacherWorkspace.activeLessonId = lessonButton.dataset.lessonId;
    setTeacherFolderView("lesson");
    return;
  }
  const studentButton = event.target.closest("[data-student-id]");
  if (studentButton) {
    openTeacherStudentProfile(studentButton.dataset.studentId || "");
    return;
  }
  const studentGroupButton = event.target.closest("[data-student-group-id]");
  if (studentGroupButton) {
    state.teacherStudentGroupId = studentGroupButton.dataset.studentGroupId || "";
    renderTeacherStudents(activeTeacherStudio());
    updateTeacherStudioHeaderState();
    return;
  }
  if (event.target.closest("[data-students-back]")) {
    state.teacherStudentGroupId = "";
    renderTeacherStudents(activeTeacherStudio());
    updateTeacherStudioHeaderState();
  }
});
els.teacherBrowser.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const createButton = event.target.closest("[data-create-type]");
  if (!createButton) return;
  event.preventDefault();
  openTeacherCreateDialog(createButton.dataset.createType || "");
});
els.teacherPrimaryAction.addEventListener("click", () => {
  if (state.teacherFolderView === "studio" && state.teacherStudioLibraryTab === "students") {
    openTeacherInviteDialog();
    return;
  }
  openTeacherCreateDialog();
});
els.teacherRootEmpty.addEventListener("click", () => openTeacherCreateDialog("studio"));
els.teacherRootEmpty.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  openTeacherCreateDialog("studio");
});
els.teacherBackButton.addEventListener("click", goTeacherBack);
els.teacherEditAction.addEventListener("click", openTeacherEditDialog);
els.teacherStudioCoverEdit?.addEventListener("click", () => {
  els.teacherStudioCoverInput.value = "";
  els.teacherStudioCoverInput.click();
});
els.teacherStudioLogoEdit?.addEventListener("click", () => {
  els.teacherStudioLogoInput.value = "";
  els.teacherStudioLogoInput.click();
});
els.teacherStudioCoverInput?.addEventListener("change", (event) => updateTeacherStudioInlineImage(event, "cover"));
els.teacherStudioLogoInput?.addEventListener("change", (event) => updateTeacherStudioInlineImage(event, "image"));
els.teacherSubgroupAction.addEventListener("click", () => openTeacherCreateDialog("subgroup"));
els.teacherBreadcrumb.addEventListener("click", (event) => {
  const button = event.target.closest("[data-breadcrumb-view]");
  if (!button) return;
  const view = button.dataset.breadcrumbView;
  if (view === "root") {
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeSubgroupIds = [];
    state.teacherWorkspace.activeLessonId = "";
  }
  if (view === "studio") {
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeSubgroupIds = [];
    state.teacherWorkspace.activeLessonId = "";
  }
  if (view === "group") {
    const depth = Number(button.dataset.subgroupDepth || 0);
    state.teacherWorkspace.activeSubgroupIds = state.teacherWorkspace.activeSubgroupIds.slice(0, depth);
    state.teacherWorkspace.activeLessonId = "";
  }
  setTeacherFolderView(view);
});
els.teacherCreateForm.addEventListener("submit", submitTeacherCreateDialog);
els.teacherCreateCancel.addEventListener("click", closeTeacherCreateDialog);
els.teacherEditForm.addEventListener("submit", submitTeacherEditDialog);
els.teacherEditCancel.addEventListener("click", closeTeacherEditDialog);
els.teacherEditImage.addEventListener("change", onTeacherEditImage);
els.teacherEditCover.addEventListener("change", onTeacherEditCover);
els.teacherAchievementAddToggle?.addEventListener("click", toggleAchievementForm);
els.teacherAchievementAddButton?.addEventListener("click", addTeacherAchievementFromForm);
els.teacherAchievementItems?.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-achievement]");
  if (!removeButton) return;
  removeTeacherAchievement(Number(removeButton.dataset.removeAchievement));
});
els.teacherInviteButton?.addEventListener("click", openTeacherInviteDialog);
els.teacherInviteForm?.addEventListener("submit", submitTeacherInviteDialog);
els.teacherInviteCancel?.addEventListener("click", closeTeacherInviteDialog);
els.teacherInviteOverlay?.addEventListener("click", (event) => {
  if (event.target === els.teacherInviteOverlay) closeTeacherInviteDialog();
});
els.teacherStudentProfileClose?.addEventListener("click", closeTeacherStudentProfile);
els.teacherStudentProfileOverlay?.addEventListener("click", (event) => {
  if (event.target === els.teacherStudentProfileOverlay) closeTeacherStudentProfile();
});
els.studioLibraryTabs?.forEach((button) => button.addEventListener("click", () => setStudioLibraryTab(button.dataset.studioLibraryTab)));
els.cameraButton.addEventListener("click", startCamera);
els.studentVideoUpload.addEventListener("change", onStudentVideoUpload);
els.studentPlayButton.addEventListener("click", toggleStudentPlayback);
els.studentSeekRange.addEventListener("input", seekStudentFromTimeline);
els.markStudentStartButton.addEventListener("click", markStudentStart);
els.markStudentEndButton.addEventListener("click", markStudentEnd);
els.buildStudentSkeletonButton.addEventListener("click", buildStudentSkeleton);
els.teacherPlayButton.addEventListener("click", toggleTeacherPlayback);
els.teacherSeekRange.addEventListener("input", seekTeacherFromTimeline);
els.markExamStartButton.addEventListener("click", markExamStart);
els.markExamEndButton.addEventListener("click", markExamEnd);
els.previewExamButton.addEventListener("click", previewExamFromMarker);
els.reviewSkeletonButton.addEventListener("click", reviewSkeleton);
els.buildReferenceButton.addEventListener("click", buildReferenceFromExam);
els.teacherRebuildReferenceButton?.addEventListener("click", buildReferenceFromExam);
els.teacherStepNextButton.addEventListener("click", advanceTeacherWizard);
els.publishLessonButton.addEventListener("click", publishTeacherLesson);
els.teacherVideoToggle.addEventListener("change", updateTeacherLayerVisibility);
els.teacherSkeletonToggle.addEventListener("change", updateTeacherLayerVisibility);
els.resultCloseButton.addEventListener("click", publishStudentAttempt);
els.retakeButton.addEventListener("click", retakeStudentAttempt);
els.levelCardButton.addEventListener("click", showLevelOverlay);
els.levelOverlayCloseButton?.addEventListener("click", () => {
  goStudentHome();
});
els.levelHistoryCloseButton.addEventListener("click", closeLevelHistory);
els.levelHistoryOverlay.addEventListener("click", (event) => {
  if (event.target === els.levelHistoryOverlay) closeLevelHistory();
});
els.studentProfileDetails.addEventListener("click", (event) => {
  if (event.target.closest(".dancer-cover-edit")) {
    els.studentProfileCoverInput.value = "";
    els.studentProfileCoverInput.click();
    return;
  }
  if (event.target.closest(".dancer-avatar-edit")) {
    els.studentProfileAvatarInput.value = "";
    els.studentProfileAvatarInput.click();
    return;
  }
  if (event.target.closest(".dancer-level-button")) openLevelHistory();
});
els.studentProfileCoverInput?.addEventListener("change", (event) => updateStudentProfileImage(event, "coverImage"));
els.studentProfileAvatarInput?.addEventListener("change", (event) => updateStudentProfileImage(event, "avatarImage"));
els.studentStudioProfilePage?.addEventListener("click", (event) => {
  const lessonButton = event.target.closest("[data-student-access-lesson-id]");
  if (lessonButton) {
    openStudentAccessibleLesson(lessonButton.dataset.studentAccessLessonId || "");
    return;
  }
  const groupButton = event.target.closest("[data-student-access-group-id]");
  if (groupButton) {
    openStudentAccessGroup(groupButton.dataset.studentAccessGroupId || "");
    return;
  }
  const subgroupButton = event.target.closest("[data-student-access-subgroup-id]");
  if (subgroupButton) {
    openStudentAccessSubgroup(subgroupButton.dataset.studentAccessSubgroupId || "");
  }
});
els.studentStudioMaterialsBack?.addEventListener("click", backStudentStudioFolder);
els.studentStudioBackButton?.addEventListener("click", goStudentHome);
els.showMistakesButton.addEventListener("click", toggleMistakes);
els.practiceButton.addEventListener("click", startPractice);
els.danceButton.addEventListener("click", toggleDance);
els.studentStepNextButton?.addEventListener("click", advanceStudentLessonStep);
els.studentExamSubmitButton?.addEventListener("click", advanceStudentLessonStep);
els.studentRetakeStepButton?.addEventListener("click", retakeStudentAttempt);
els.speedRange.addEventListener("input", updateSpeed);
els.segmentRange.addEventListener("input", updateSegment);
els.mirrorToggle.addEventListener("change", updateMirror);
teacherVideo.addEventListener("timeupdate", updateCurrentVideoTime);
teacherVideo.addEventListener("seeked", () => {
  updateCurrentVideoTime();
  renderTeacherPoseFrame();
});
teacherVideo.addEventListener("play", updateTeacherPlayButton);
teacherVideo.addEventListener("pause", () => {
  updateTeacherPlayButton();
  renderTeacherPoseFrame();
});
teacherVideo.addEventListener("ended", updateTeacherPlayButton);
if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
  teacherVideo.requestVideoFrameCallback(onTeacherVideoFrame);
}
teacherVideo.addEventListener("loadedmetadata", () => {
  els.teacherEmpty.hidden = true;
  activeClip().duration = teacherVideo.duration || 0;
  els.segmentRange.value = 0;
  normalizeClipRange(activeClip());
  syncTeacherTimeline();
  updateSegment();
  updateExamMarker();
  resizeCanvasToVideo(teacherCanvas, teacherVideo);
  renderTeacherPoseFrame();
});

studentVideo.addEventListener("loadedmetadata", () => {
  els.studentEmpty.hidden = true;
  state.studentClip.duration = studentVideo.duration || 0;
  normalizeClipRange(state.studentClip);
  syncStudentTimeline();
  resizeCanvasToVideo(studentCanvas, studentVideo);
});
studentVideo.addEventListener("timeupdate", updateStudentVideoTime);
studentVideo.addEventListener("play", updateStudentPlayButton);
studentVideo.addEventListener("pause", () => {
  updateStudentPlayButton();
  renderStudentPoseFrame();
});
studentVideo.addEventListener("seeked", () => {
  updateStudentVideoTime();
  renderStudentPoseFrame();
});

window.addEventListener("resize", () => {
  resizeCanvasToVideo(teacherCanvas, teacherVideo);
  resizeCanvasToVideo(studentCanvas, studentVideo);
});

async function initPose() {
  if (state.teacherLandmarker && state.liveLandmarker) {
    return true;
  }
  if (state.modelLoading && state.modelReadyPromise) {
    return state.modelReadyPromise;
  }

  state.modelLoading = true;
  state.modelFailed = false;
  els.modelStatus.textContent = "Модель загружается";

  state.modelReadyPromise = (async () => {
    try {
      const { PoseLandmarker, fileset } = await loadPoseRuntime();
      const teacher = await createPoseLandmarker(PoseLandmarker, fileset, "IMAGE");
      const live = await createPoseLandmarker(PoseLandmarker, fileset, "VIDEO", teacher.model);
      state.teacherLandmarker = teacher.landmarker;
      state.liveLandmarker = live.landmarker;
      state.poseModelName = live.model.name;

      els.modelStatus.textContent = `Модель готова: ${state.poseModelName}`;
      state.modelFailed = false;
      setButtons(true);
      return true;
    } catch (error) {
      els.modelStatus.textContent = "Модель не загрузилась";
      state.modelFailed = true;
      if (state.exam.objectUrl && state.pendingExamScan) {
        setUploadStatus("exam", "Модель трекинга не загрузилась", "error");
        showScanOverlay("Модель трекинга не загрузилась", 0);
        els.reviewStatus.textContent = "модель трекинга не загрузилась";
        els.scanStatus.textContent = "Проверьте интернет и нажмите «Считать эталон» еще раз";
      }
      console.error(error);
      return false;
    } finally {
      state.modelLoading = false;
    }
  })();

  return state.modelReadyPromise;
}

async function loadPoseRuntime() {
  let lastError = null;
  for (const source of TASKS_VISION_SOURCES) {
    try {
      const { FilesetResolver, PoseLandmarker } = await import(source.module);
      const fileset = await FilesetResolver.forVisionTasks(source.wasm);
      return { PoseLandmarker, fileset };
    } catch (error) {
      lastError = error;
      console.warn("MediaPipe runtime не загрузился", source.module, error);
    }
  }
  throw lastError || new Error("MediaPipe runtime не загрузился");
}

async function createPoseLandmarker(PoseLandmarker, fileset, runningMode, preferredModel = null) {
  const models = preferredModel ? [preferredModel, ...POSE_MODEL_SOURCES.filter((model) => model.url !== preferredModel.url)] : POSE_MODEL_SOURCES;
  let lastError = null;

  for (const model of models) {
    for (const delegate of ["GPU", "CPU"]) {
      try {
        const landmarker = await PoseLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: model.url,
            delegate,
          },
          runningMode,
          numPoses: 1,
          minPoseDetectionConfidence: 0.45,
          minPosePresenceConfidence: 0.45,
          minTrackingConfidence: 0.45,
        });
        return { landmarker, model, delegate };
      } catch (error) {
        lastError = error;
        console.warn(`MediaPipe ${model.name} ${runningMode} ${delegate} не запустился`, error);
      }
    }
  }

  throw lastError || new Error("MediaPipe Pose Landmarker не запустился");
}

function setButtons(modelReady) {
  els.markExamStartButton.disabled = false;
  els.markExamEndButton.disabled = false;
  els.previewExamButton.disabled = false;
  els.reviewSkeletonButton.disabled = false;
  els.practiceButton.disabled = false;
  els.danceButton.disabled = !modelReady;
}

function resetFileInputBeforePick(event) {
  event.currentTarget.value = "";
}

async function onTeacherUpload(event, type) {
  window.__danceMainUploadHandledAt = Date.now();
  window.__danceMainUploadHandledType = type;
  const [file] = event.target.files;
  if (!file) return;

  state.scanId += 1;
  setUploadStatus(type, "Загружается...", "processing");
  const clip = clipFor(type);
  if (clip.objectUrl) {
    URL.revokeObjectURL(clip.objectUrl);
  }

  els.teacherEmpty.hidden = true;
  clip.objectUrl = URL.createObjectURL(file);
  clip.fileName = file.name;
  clip.fileSize = file.size;
  resetClip(clip);
  showUploadPreview(type, clip.objectUrl);
  bindTeacherVideoToClip(type);
  if (type === "learning" || type === "exam") {
    els.appShell.classList.add("teacher-video-ready");
  }

  if (type === "exam") {
    state.pendingExamScan = true;
    state.reference = [];
    state.studentSkeleton = [];
    state.score = 0;
    state.bestMatch = 0;
    state.studentRecording = [];
    updateScore(0);
    updateMeters(emptyScores());
    els.reviewStatus.textContent = "экзамен загружен";
    els.scanStatus.textContent = "Жду метаданные видео под музыку";
    showScanOverlay("Готовлю видео", 0);
    updatePipeline("scan");
  } else {
    els.scanStatus.textContent = "Загружаю обучающее видео";
    updatePipeline("upload");
  }

  const uploadScanId = state.scanId;
  try {
    await waitForMetadata(teacherVideo);
  } catch (error) {
    setUploadStatus(type, "Формат видео не читается", "error");
    els.scanStatus.textContent = "Браузер не смог открыть это видео";
    console.error(error);
    return;
  }
  if (uploadScanId !== state.scanId) return;
  clip.duration = teacherVideo.duration || 0;
  normalizeClipRange(clip);
  await showClipStartFrame(clip);
  document.querySelector(".stage-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  updateExamControls();
  updatePipeline(type === "exam" ? "scan" : "upload");

  if (type === "exam") {
    els.teacherScanOverlay.hidden = true;
    state.pendingExamScan = false;
    setUploadStatus("exam", "Видео готово", "ready");
    els.reviewStatus.textContent = "видео готово";
    els.scanStatus.textContent = "Поставьте начало/конец и нажмите «Дальше»";
    updatePipeline("scan");
  } else {
    setUploadStatus("learning", "Обучающее видео готово", "ready");
    els.scanStatus.textContent = "Обучающее видео готово";
    updatePipeline("upload");
  }
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    els.modelStatus.textContent = "Камера работает только через HTTPS или localhost";
    els.taskStatus.textContent = "нужен HTTPS для камеры";
    return;
  }

  try {
    const stream = await openStudentCamera();

    studentVideo.srcObject = stream;
    studentVideo.muted = true;
    studentVideo.controls = false;
    studentVideo.removeAttribute("controls");
    studentVideo.setAttribute("playsinline", "");
    await studentVideo.play();
    state.cameraReady = true;
    els.studentEmpty.hidden = true;
    els.modelStatus.textContent = "Камера готова";
    updateMirror();
    loop();
  } catch (error) {
    els.modelStatus.textContent = window.isSecureContext
      ? "Камера недоступна: разрешите доступ в Safari"
      : "Камера недоступна без HTTPS";
    els.taskStatus.textContent = window.isSecureContext ? "разрешите камеру" : "нужен HTTPS";
    console.error(error);
  }
}

async function openStudentCamera() {
  const frontCamera = {
    video: {
      facingMode: { ideal: "user" },
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false,
  };

  try {
    return await navigator.mediaDevices.getUserMedia(frontCamera);
  } catch (error) {
    console.warn("Фронтальная камера не выбрана, пробую любую доступную", error);
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });
  }
}

async function onStudentVideoUpload(event) {
  const [file] = event.target.files;
  if (!file) return;
  if (state.studentVideoObjectUrl) {
    URL.revokeObjectURL(state.studentVideoObjectUrl);
  }

  state.studentVideoObjectUrl = URL.createObjectURL(file);
  state.studentVideoFileName = file.name;
  state.studentVideoFileSize = file.size;
  state.studentScanId += 1;
  state.studentSkeleton = [];
  studentVideo.srcObject = null;
  studentVideo.src = state.studentVideoObjectUrl;
  studentVideo.muted = true;
  studentVideo.controls = false;
  studentVideo.removeAttribute("controls");
  studentVideo.autoplay = false;
  studentVideo.setAttribute("playsinline", "");
  studentVideo.setAttribute("webkit-playsinline", "");
  studentVideo.preload = "auto";
  studentVideo.load();
  resetClip(state.studentClip);
  els.studentEmpty.hidden = true;
  els.taskStatus.textContent = "загружаю видео ученика";

  try {
    await waitForMetadata(studentVideo);
    await revealUploadedVideoFrame(studentVideo);
  } catch (error) {
    els.taskStatus.textContent = "видео ученика не читается";
    console.error(error);
    return;
  }

  state.cameraReady = false;
  els.taskStatus.textContent = "видео ученика загружено";
  state.studentClip.duration = studentVideo.duration || 0;
  normalizeClipRange(state.studentClip);
  resizeCanvasToVideo(studentCanvas, studentVideo);
  syncStudentTimeline();
  if (state.studentClip.start > 0.02) {
    await seekStudentVideo(state.studentClip.start);
  }
  studentVideo.pause();
  updateStudentPlayButton();
  try {
    renderStudentPoseFrame();
  } catch (error) {
    console.warn("Не удалось отрисовать скелет на первом кадре ученика", error);
  }
  updateMirror();
}

async function revealUploadedVideoFrame(video) {
  await waitForMediaReady(video);
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
  const previewTime = Math.min(0.05, Math.max(0, video.duration - 0.01));
  if (video.currentTime < previewTime) {
    await seekMedia(video, previewTime);
  }
  try {
    await video.play();
    video.pause();
  } catch (error) {
    console.warn("Safari не разрешил авто-предпросмотр видео", error);
  }
}

function clipFor(type) {
  return type === "learning" ? state.learning : state.exam;
}

function activeClip() {
  return clipFor(state.activeTeacherVideo);
}

function resetClip(clip) {
  clip.duration = 0;
  clip.start = 0;
  clip.end = 0;
  clip.startSet = false;
  clip.endSet = false;
}

function showUploadPreview(type, src) {
  const preview = type === "learning" ? els.learningPreviewVideo : els.examPreviewVideo;
  preview.hidden = false;
  preview.src = src;
  preview.load();
}

function bindTeacherVideoToClip(type) {
  const clip = clipFor(type);
  state.activeTeacherVideo = type;
  teacherVideo.pause();
  setTeacherVideoNativeControls(true);
  els.appShell.classList.toggle("teacher-video-ready", Boolean(clip.objectUrl));
  if (clip.objectUrl) {
    teacherVideo.src = clip.objectUrl;
    teacherVideo.load();
    els.teacherEmpty.hidden = true;
  }
  els.teacherVideoToggle.checked = true;
  teacherVideo.classList.remove("is-hidden-layer");
  els.teacherVideoModeLabel.textContent = els.appShell.classList.contains("teacher-mode")
    ? "Мастер урока"
    : type === "learning"
      ? "Обучение"
      : "Под музыку";
  els.showLearningVideoButton.classList.toggle("active", type === "learning");
  els.showExamVideoButton.classList.toggle("active", type === "exam");
  els.teacherSkeletonToggle.disabled = type === "learning";
  els.reviewSkeletonButton.disabled = type === "learning";
  if (type === "learning") {
    clearCanvas(teacherCtx, teacherCanvas);
  }
}

async function buildReferenceFromExam() {
  if (!state.exam.objectUrl) {
    els.reviewStatus.textContent = "сначала загрузите видео под музыку";
    return;
  }
  await switchTeacherVideo("exam");
  try {
    await waitForMetadata(teacherVideo);
  } catch (error) {
    setUploadStatus("exam", "Формат видео не читается", "error");
    els.scanStatus.textContent = "Браузер не смог открыть видео под музыку";
    console.error(error);
    return;
  }
  state.exam.duration = teacherVideo.duration || state.exam.duration || 0;
  normalizeClipRange(state.exam);
  if (!state.teacherLandmarker) {
    state.pendingExamScan = true;
    setUploadStatus("exam", "Загружаю модель трекинга", "processing");
    showScanOverlay("Загружаю модель трекинга", 0);
    els.reviewStatus.textContent = "готовлю анализ";
    els.scanStatus.textContent = "Загружаю MediaPipe для скелета";
    const ready = await initPose();
    if (!ready || !state.teacherLandmarker) {
      setUploadStatus("exam", "Модель трекинга не загрузилась", "error");
      showScanOverlay("Модель трекинга не загрузилась", 0);
      els.reviewStatus.textContent = "анализ недоступен";
      els.scanStatus.textContent = "Проверьте интернет и нажмите «Считать эталон» еще раз";
      return;
    }
  }
  state.pendingExamScan = true;
  state.reference = [];
  setUploadStatus("exam", "Считываю эталон...", "processing");
  showScanOverlay("Считываю эталон", 0);
  try {
    await scanTeacherVideo({ reason: "upload" });
  } catch (error) {
    state.mode = "idle";
    state.pendingExamScan = false;
    setTeacherScanning(false, 0);
    setUploadStatus("exam", "Эталон не считался", "error");
    els.reviewStatus.textContent = "ошибка считывания";
    els.scanStatus.textContent = "Не удалось считать эталон. Попробуйте загрузить видео еще раз";
    console.error(error);
  }
}

function setUploadStatus(type, text, status) {
  const input = type === "learning" ? els.learningUpload : els.examUpload;
  const label = input.closest(".upload-drop, .teacher-upload-empty") || els.teacherUploadLabel;
  const statusEl = type === "learning" ? els.learningUploadStatus : els.examUploadStatus;
  statusEl.textContent = text;
  label?.classList.toggle("is-ready", status === "ready");
  label?.classList.toggle("is-processing", status === "processing");
  label?.classList.toggle("is-error", status === "error");
}

function showScanOverlay(text, progress = 0) {
  els.teacherScanOverlay.hidden = false;
  els.scanOverlayText.textContent = text;
  els.scanProgressValue.textContent = `${Math.min(100, Math.max(0, Math.round(progress)))}%`;
}

async function showClipStartFrame(clip) {
  if (!teacherVideo.src || !teacherVideo.duration) return;
  const time = Math.min(Math.max(0, clip.start || 0), Math.max(0, teacherVideo.duration - 0.05));
  await seekTeacher(time);
  teacherVideo.pause();
  updateCurrentVideoTime();
}

async function switchTeacherVideo(type) {
  const clip = clipFor(type);
  state.activeTeacherVideo = type;
  teacherVideo.pause();
  setTeacherVideoNativeControls(els.appShell.classList.contains("teacher-mode"));
  clearCanvas(teacherCtx, teacherCanvas);

  if (clip.objectUrl && teacherVideo.src !== clip.objectUrl) {
    teacherVideo.src = clip.objectUrl;
    teacherVideo.load();
  } else if (!clip.objectUrl) {
    teacherVideo.removeAttribute("src");
    teacherVideo.load();
  }

  els.appShell.classList.toggle("teacher-video-ready", Boolean(clip.objectUrl));
  els.teacherEmpty.hidden = Boolean(clip.objectUrl);
  els.teacherVideoModeLabel.textContent = els.appShell.classList.contains("teacher-mode")
    ? "Мастер урока"
    : type === "learning"
      ? "Обучение"
      : "Под музыку";
  els.showLearningVideoButton.classList.toggle("active", type === "learning");
  els.showExamVideoButton.classList.toggle("active", type === "exam");
  els.teacherSkeletonToggle.disabled = type === "learning";
  els.reviewSkeletonButton.disabled = type === "learning";
  updateTeacherLayerVisibility();
  updateExamControls();
  syncTeacherTimeline();
}

function setTeacherVideoNativeControls(enabled) {
  teacherVideo.setAttribute("playsinline", "");
  teacherVideo.setAttribute("webkit-playsinline", "");
  if (enabled) {
    teacherVideo.controls = true;
    teacherVideo.setAttribute("controls", "");
    return;
  }
  teacherVideo.controls = false;
  teacherVideo.removeAttribute("controls");
}

async function scanTeacherVideo(options = {}) {
  if (!state.exam.objectUrl) {
    els.reviewStatus.textContent = "сначала загрузите видео под музыку";
    els.scanStatus.textContent = "Эталон не считан";
    return;
  }
  if (!state.teacherLandmarker) {
    await buildReferenceFromExam();
    return;
  }

  const scanId = ++state.scanId;
  state.reference = [];
  state.mode = "scan";
  await switchTeacherVideo("exam");
  els.teacherSkeletonToggle.checked = true;
  els.teacherSkeletonToggle.disabled = false;
  teacherVideo.pause();
  clearCanvas(teacherCtx, teacherCanvas);
  setTeacherScanning(true, 0);
  updatePipeline("scan");
  const start = state.exam.start || 0;
  const end = Math.max(start, examEnd());
  await seekTeacher(start);
  els.scanStatus.textContent = "Считываю эталон...";

  const targetFps = REFERENCE_SCAN_FPS;
  const step = 1 / targetFps;
  const totalFrames = Math.max(1, Math.ceil((end - start) / step));
  let frameIndex = 0;

  for (let time = start; time <= end; time += step) {
    await seekTeacher(time);
    await waitForMediaReady(teacherVideo);
    if (scanId !== state.scanId) {
      cancelTeacherScan();
      return;
    }
    resizeCanvasToVideo(teacherCanvas, teacherVideo);
    clearCanvas(teacherCtx, teacherCanvas);
    const result = safeDetectPose(state.teacherLandmarker, teacherVideo);
    const landmarks = result.landmarks?.[0];
    const worldLandmarks = normalizedWorldLandmarksFromResult(result);
    if (landmarks) {
      const normalized = normalizeLandmarks(landmarks);
      drawPose(teacherCtx, teacherCanvas, landmarks, "#f5c542");
      state.reference.push({
        time,
        displayLandmarks: cloneLandmarks(landmarks),
        landmarks: normalized,
        worldLandmarks,
        angles: poseAngles(landmarks),
        signature: movementSignature(normalized),
      });
    }
    frameIndex += 1;
    const progress = Math.round(((time - start) / Math.max(end - start, 1)) * 100);
    const scanText = landmarks
      ? `Кадр ${frameIndex}/${totalFrames}: скелет найден, собрано ${state.reference.length}`
      : `Кадр ${frameIndex}/${totalFrames}: ищу тело`;
    els.scanStatus.textContent = `${progress}% · ${state.reference.length} кадров`;
    setTeacherScanning(true, progress, scanText);
    updateCurrentVideoTime();
    await nextFrame();
    if (scanId !== state.scanId) {
      cancelTeacherScan();
      return;
    }
  }

  teacherVideo.currentTime = start;
  state.mode = "idle";
  clearCanvas(teacherCtx, teacherCanvas);
  setTeacherScanning(false, 100);
  state.pendingExamScan = false;
  els.scanStatus.textContent = `${state.reference.length} кадров скелета готово`;
  els.reviewStatus.textContent = state.reference.length ? "эталон считан" : "скелет не найден";
  setUploadStatus("exam", state.reference.length ? "Эталон готов" : "Скелет не найден", state.reference.length ? "ready" : "processing");
  if (state.reference.length) {
    saveStoredReference();
  }
  els.teacherSkeletonToggle.checked = true;
  els.teacherSkeletonToggle.disabled = false;
  updatePipeline(state.reference.length ? "review" : "upload");
  updateTeacherLayerVisibility();
  renderTeacherPoseFrame();
}

function cancelTeacherScan() {
  state.mode = "idle";
  state.pendingExamScan = false;
  clearCanvas(teacherCtx, teacherCanvas);
  setTeacherScanning(false, 0);
  els.scanStatus.textContent = "Считывание эталона остановлено";
}

function referenceStorageKey() {
  if (!state.exam.fileName || !state.exam.duration) return "";
  return [
    "danceReference",
    state.exam.fileName,
    state.exam.fileSize || 0,
    Math.round(state.exam.duration * 1000),
    Math.round(state.exam.start * 1000),
    Math.round(examEnd() * 1000),
    REFERENCE_SCAN_FPS,
  ].join(":");
}

function saveStoredReference() {
  const key = referenceStorageKey();
  if (!key || !state.reference.length) return false;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        savedAt: Date.now(),
        fps: REFERENCE_SCAN_FPS,
        start: state.exam.start,
        end: examEnd(),
        frames: state.reference,
      }),
    );
    els.scanStatus.textContent = `${state.reference.length} кадров эталона сохранено`;
    return true;
  } catch (error) {
    els.scanStatus.textContent = "Эталон считан, но не сохранился: мало памяти";
    console.warn(error);
    return false;
  }
}

function loadStoredReference() {
  const key = referenceStorageKey();
  if (!key) return false;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved.frames) || !saved.frames.length) return false;
    state.reference = saved.frames;
    state.pendingExamScan = false;
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

async function startPractice() {
  if (!state.learning.objectUrl && !state.exam.objectUrl) return;

  state.mode = "practice";
  els.appShell.classList.add("practice-focus");
  els.appShell.classList.add("student-learning-mode");
  els.appShell.classList.remove("student-exam-mode", "student-result-mode");
  updateLessonFlow("practice");
  await switchTeacherVideo(state.learning.objectUrl ? "learning" : "exam");
  teacherVideo.playbackRate = Number(els.speedRange.value);
  teacherVideo.currentTime = segmentStart();
  teacherVideo.play();
  loop();
}

async function toggleDance() {
  if (state.mode === "dance" || state.mode === "countdown") {
    finishAttempt();
    return;
  }

  const useStudentFile = Boolean(state.studentVideoObjectUrl);
  if (!state.cameraReady && !useStudentFile) {
    await startCamera();
  }
  if (!state.exam.objectUrl) {
    els.taskStatus.textContent = "нет видео под музыку";
    return;
  }
  await switchTeacherVideo("exam");
  if (!state.reference.length) {
    await scanTeacherVideo();
  }
  if (!state.reference.length) return;

  if (useStudentFile && state.studentSkeleton.length) {
    state.studentRecording = state.studentSkeleton.map((sample) => ({ ...sample }));
    const result = evaluateRecordedAttempt();
    finalizeAttemptResult(result, Math.max(1, Math.round(clipEnd(state.studentClip) - state.studentClip.start)));
    els.taskStatus.textContent = "результат по считанному скелету";
    return;
  }

  els.appShell.classList.remove("practice-focus");
  els.appShell.classList.add("student-exam-mode");
  els.appShell.classList.remove("student-learning-mode", "student-result-mode");
  state.mode = "countdown";
  updateLessonFlow("exam");
  state.score = 0;
  state.bestMatch = 0;
  state.currentMatch = 0;
  state.studentRecording = [];
  state.lastRecordAt = -1;
  state.startedAt = performance.now();
  teacherVideo.playbackRate = 1;
  state.recordingEnd = examEnd();
  await seekTeacher(state.exam.start);
  if (useStudentFile) {
    await seekStudentVideo(state.studentClip.start || 0);
    studentVideo.pause();
  }
  teacherVideo.pause();
  renderTeacherPoseFrame();
  updateScore(0);
  updateMeters(emptyScores());
  els.matchLabel.textContent = "приготовься";
  els.taskStatus.textContent = "встань в позу";
  els.danceButton.textContent = "Стоп";
  await runExamCountdown();
  if (state.mode !== "countdown") return;

  state.mode = "dance";
  state.startedAt = performance.now();
  els.matchLabel.textContent = "запись под музыку";
  await teacherVideo.play();
  if (useStudentFile) {
    await studentVideo.play();
    els.taskStatus.textContent = "сравнение с видео ученика";
  } else {
    els.taskStatus.textContent = "идет запись";
  }
  loop();
}

function finishAttempt() {
  if (state.mode === "countdown") {
    state.countdownToken += 1;
    hideCountdown();
    state.mode = "idle";
    els.danceButton.textContent = "Сдать танец →";
    els.taskStatus.textContent = "не начато";
    return;
  }

  const seconds = Math.max(1, Math.round((performance.now() - state.startedAt) / 1000));
  const result = evaluateRecordedAttempt();
  finalizeAttemptResult(result, seconds);
}

function finalizeAttemptResult(result, seconds) {
  const stars = Math.max(1, matchToStars(result.total));
  const lesson = activeTeacherLesson() || {};
  const attempt = {
    score: result.score,
    stars,
    match: result.total,
    scores: result,
    seconds,
    lessonId: lesson.id || "",
    lessonName: lesson.name || "Танец недели",
    lessonImage: lesson.image || "./assets/dance-lesson-thumb.png",
    at: new Date().toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  state.attempts.unshift(attempt);
  state.attempts = state.attempts.slice(0, 5);
  localStorage.setItem("danceReplayAttempts", JSON.stringify(state.attempts));
  renderAttempts();

  state.mode = "idle";
  state.lastResult = result;
  state.lastAttempt = attempt;
  els.appShell.classList.remove("practice-focus");
  els.appShell.classList.add("student-publish-mode");
  els.appShell.classList.remove("student-learning-mode", "student-exam-mode", "student-result-mode");
  hideCountdown();
  teacherVideo.pause();
  if (state.studentVideoObjectUrl) {
    studentVideo.pause();
  }
    els.danceButton.textContent = "Сдать танец →";
  updateLevelDisplay();
  updateMeters(result);
  updateLessonFlow("publish");
  els.taskStatus.textContent = stars >= 3 ? "попытка готова к публикации" : "можно пересдать перед публикацией";
}

async function runExamCountdown() {
  const token = ++state.countdownToken;
  const steps = [
    { value: "3", hint: "Смотри на педагога" },
    { value: "2", hint: "Встань в стартовую позу" },
    { value: "1", hint: "Приготовься к музыке" },
    { value: "Танцуй", hint: "Запись начинается" },
  ];

  els.countdownOverlay.hidden = false;
  for (const step of steps) {
    if (token !== state.countdownToken || state.mode !== "countdown") return;
    els.countdownValue.textContent = step.value;
    els.countdownValue.classList.toggle("is-word", step.value.length > 1);
    els.countdownHint.textContent = step.hint;
    els.countdownValue.style.animation = "none";
    void els.countdownValue.offsetWidth;
    els.countdownValue.style.animation = "";
    await delay(step.value === "Танцуй" ? 520 : 820);
  }
  if (token === state.countdownToken) {
    hideCountdown();
  }
}

function hideCountdown() {
  els.countdownOverlay.hidden = true;
}

function loop() {
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(processFrame);
}

function processFrame() {
  const canAnalyzeStudent = (state.cameraReady || state.studentVideoObjectUrl) && state.liveLandmarker;
  if (canAnalyzeStudent && studentVideo.currentTime !== state.lastVideoTime) {
    state.lastVideoTime = studentVideo.currentTime;
    const result = safeDetectPoseForVideo(state.liveLandmarker, studentVideo, performance.now());
    const student = result.landmarks?.[0];
    const studentWorld = result.worldLandmarks?.[0] || null;

    clearCanvas(studentCtx, studentCanvas);
    if (student) {
      drawPose(studentCtx, studentCanvas, student, "#2dd4bf");
      if (state.mode === "dance" && state.reference.length) {
        recordStudentFrame(student, studentWorld);
      }
    }
  }

  if (teacherVideo.src && !teacherVideo.paused) {
    renderTeacherPoseFrame();
  }

  if (state.mode === "practice" && teacherVideo.currentTime > segmentEnd()) {
    teacherVideo.currentTime = segmentStart();
  }

  if (
    state.mode !== "dance" &&
    state.studentVideoObjectUrl &&
    !studentVideo.paused &&
    studentVideo.currentTime >= clipEnd(state.studentClip)
  ) {
    studentVideo.currentTime = state.studentClip.start || 0;
  }

  if (state.mode === "dance" && teacherVideo.ended) {
    finishAttempt();
  }

  if (state.mode === "dance" && teacherVideo.currentTime >= examEnd()) {
    finishAttempt();
  }

  if (state.mode === "dance" && state.studentVideoObjectUrl && studentVideo.currentTime >= clipEnd(state.studentClip)) {
    finishAttempt();
  }

  if (state.mode === "review" && teacherVideo.currentTime >= activeClipEnd()) {
    teacherVideo.pause();
    state.mode = "idle";
    els.reviewStatus.textContent = "проверка завершена";
  }

  if (state.mode === "review" && teacherVideo.ended) {
    state.mode = "idle";
    els.reviewStatus.textContent = "проверка завершена";
  }

  if (
    state.mode === "practice" ||
    state.mode === "dance" ||
    state.mode === "review" ||
    state.cameraReady ||
    (state.studentVideoObjectUrl && !studentVideo.paused) ||
    (teacherVideo.src && !teacherVideo.paused)
  ) {
    state.raf = requestAnimationFrame(processFrame);
  }
}

function onTeacherVideoFrame(_now, metadata) {
  if (
    teacherVideo.src &&
    !teacherVideo.paused &&
    state.activeTeacherVideo === "exam" &&
    state.mode !== "scan" &&
    els.teacherSkeletonToggle.checked
  ) {
    renderTeacherPoseFrame(metadata.mediaTime);
  }
  teacherVideo.requestVideoFrameCallback(onTeacherVideoFrame);
}

function nearestReference(time) {
  if (!state.reference.length) return null;
  let best = state.reference[0];
  let diff = Math.abs(best.time - time);

  for (const item of state.reference) {
    const nextDiff = Math.abs(item.time - time);
    if (nextDiff < diff) {
      best = item;
      diff = nextDiff;
    }
  }

  return best;
}

function interpolatedReferenceLandmarks(time) {
  const references = state.reference;
  if (!references.length) return null;
  if (references.length === 1 || time <= references[0].time) {
    return references[0].displayLandmarks || null;
  }

  let low = 0;
  let high = references.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (references[mid].time < time) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const next = references[Math.min(low, references.length - 1)];
  const previous = references[Math.max(0, low - 1)];
  if (!next?.displayLandmarks) return previous?.displayLandmarks || null;
  if (!previous?.displayLandmarks || next === previous) return next.displayLandmarks;

  const gap = next.time - previous.time;
  if (gap <= 0) return next.displayLandmarks;
  const amount = clamp((time - previous.time) / gap, 0, 1);
  return interpolateLandmarks(previous.displayLandmarks, next.displayLandmarks, amount);
}

function interpolateLandmarks(previous, next, amount) {
  return previous.map((point, index) => {
    const target = next[index] || point;
    return {
      x: lerp(point.x, target.x, amount),
      y: lerp(point.y, target.y, amount),
      z: lerp(point.z || 0, target.z || 0, amount),
      visibility: lerp(point.visibility ?? 1, target.visibility ?? 1, amount),
    };
  });
}

function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

function cloneLandmarks(landmarks) {
  if (!landmarks) return null;
  return landmarks.map((point) => ({
    x: point.x,
    y: point.y,
    z: point.z || 0,
    visibility: point.visibility ?? 1,
  }));
}

function normalizedWorldLandmarksFromResult(result) {
  return normalizeWorldLandmarks(result.worldLandmarks?.[0] || null);
}

function recordStudentFrame(studentLandmarks, studentWorldLandmarks = null) {
  const musicTime = teacherVideo.currentTime;
  if (musicTime < state.exam.start || musicTime > state.recordingEnd) return;
  if (state.lastRecordAt >= 0 && musicTime - state.lastRecordAt < 0.08) return;

  const normalized = normalizeLandmarks(studentLandmarks);
  const sample = {
    time: musicTime,
    angles: poseAngles(studentLandmarks),
    landmarks: normalized,
    worldLandmarks: normalizeWorldLandmarks(studentWorldLandmarks),
  };
  sample.signature = movementSignature(sample.landmarks);

  state.studentRecording.push(sample);
  state.lastRecordAt = musicTime;

  const progress = Math.max(0, musicTime - state.exam.start);
  els.matchValue.textContent = `${state.studentRecording.length}`;
  els.matchLabel.textContent = "кадров записи";
  els.matchArc.style.strokeDashoffset = String(
    314 - (314 * Math.min(1, progress / Math.max(1, state.recordingEnd - state.exam.start))),
  );
}

function evaluateRecordedAttempt() {
  const start = state.exam.start;
  const end = Math.max(start, examEnd());
  const references = state.reference.filter((item) => item.time >= start && item.time <= end);
  const totals = [];
  const mistakes = [];
  let matchedFrames = 0;
  const groups = {
    arms: [],
    legs: [],
    body: [],
    chest: [],
    head: [],
    fingers: [],
    position: [],
    timing: [],
    trajectory: [],
    amplitude: [],
    energy: [],
    motion: [],
    world: [],
  };

  references.forEach((reference) => {
    const student = nearestStudentSample(reference.time);
    if (!student || Math.abs(student.time - reference.time) > 0.28) {
      Object.values(groups).forEach((values) => values.push(0));
      totals.push(0);
      mistakes.push({
        time: reference.time,
        score: 0,
        label: "нет позы ученика в этот момент",
      });
      return;
    }
    matchedFrames += 1;

    const referencePrevious = previousReferenceSample(reference.time);
    const referenceNext = nextReferenceSample(reference.time);
    const studentPrevious = previousStudentSample(student.time);
    const studentNext = nextStudentSample(student.time);
    const movementType = classifyMovementMoment(reference, referencePrevious, referenceNext);

    const arms = weightedAverage(
      [
        jointCategoryGroupScore(reference.signature, student.signature, ["leftArm", "rightArm"]),
        angleGroupScore(reference.angles.arms, student.angles.arms),
      ],
      [0.46, 0.54],
    );
    const legs = weightedAverage(
      [
        jointCategoryGroupScore(reference.signature, student.signature, ["leftLeg", "rightLeg", "stance"]),
        angleGroupScore(reference.angles.legs, student.angles.legs),
      ],
      [0.5, 0.5],
    );
    const body = weightedAverage(
      [
        jointCategoryGroupScore(reference.signature, student.signature, ["torso", "level"]),
        angleGroupScore(reference.angles.body, student.angles.body),
      ],
      [0.45, 0.55],
    );
    const chest = angleGroupScore(reference.angles.chest, student.angles.chest);
    const head = angleGroupScore(reference.angles.head, student.angles.head);
    const fingers = angleGroupScore(reference.angles.fingers, student.angles.fingers);
    const position = weightedAverage(
      [
        landmarkGroupScore(reference.landmarks, student.landmarks),
        poseShapeScore(reference.signature, student.signature),
        weightedAverage([arms, legs, body], [0.38, 0.36, 0.26]),
      ],
      [0.42, 0.28, 0.3],
    );
    const timing = timingScore(reference.time, student.time);
    const trajectory = trajectoryScore(referencePrevious, referenceNext, studentPrevious, studentNext);
    const amplitude = amplitudeScore(reference.signature, student.signature);
    const energy = energyScore(referencePrevious, referenceNext, studentPrevious, studentNext);
    const motion = motionScore(referencePrevious, referenceNext, studentPrevious, studentNext);
    const world = worldPoseScore(reference.worldLandmarks, student.worldLandmarks);
    const corrected = reconcileMicroJitterScores({
      position,
      timing,
      trajectory,
      amplitude,
      energy,
      motion,
      world,
      arms,
      legs,
      body,
      chest,
      head,
      fingers,
    });
    const total = adaptiveMomentScore(corrected, movementType);
    if (total < 70 && shouldReportMistake(corrected)) {
      mistakes.push({
        time: reference.time,
        score: Math.round(total),
        label: weakestMomentLabel(corrected),
      });
    }

    groups.arms.push(corrected.arms);
    groups.legs.push(corrected.legs);
    groups.body.push(corrected.body);
    groups.chest.push(corrected.chest);
    groups.head.push(corrected.head);
    groups.fingers.push(corrected.fingers);
    groups.position.push(corrected.position);
    groups.timing.push(corrected.timing);
    groups.trajectory.push(corrected.trajectory);
    groups.amplitude.push(corrected.amplitude);
    groups.energy.push(corrected.energy);
    groups.motion.push(corrected.motion);
    groups.world.push(corrected.world);
    totals.push(total);
  });

  const coverage = references.length ? matchedFrames / references.length : 0;
  const motionStats = motionStatsForAttempt(references, state.studentRecording);
  const rawTotal = average(totals) * Math.pow(coverage, 1.35);
  const quality = {
    arms: average(groups.arms),
    legs: average(groups.legs),
    body: average(groups.body),
    position: average(groups.position),
    timing: average(groups.timing) * coverage,
    amplitude: average(groups.amplitude),
    trajectory: average(groups.trajectory),
    energy: average(groups.energy),
    motion: weightedAverage([average(groups.motion), motionStats.score], [0.58, 0.42]),
    world: average(groups.world),
    movementRatio: motionStats.ratio,
    referenceMovement: motionStats.referenceMovement,
    studentMovement: motionStats.studentMovement,
  };
  const total = calibratedMatchTotal(rawTotal, coverage, quality);
  const filteredMistakes = filterReportedMistakes(mistakes, total, coverage);
  const result = {
    arms: quality.arms,
    legs: quality.legs,
    body: quality.body,
    chest: average(groups.chest),
    head: average(groups.head),
    fingers: average(groups.fingers),
    position: weightedAverage([quality.position, quality.trajectory], [0.82, 0.18]),
    timing: calibratedMetricScore(quality.timing, coverage),
    trajectory: quality.trajectory,
    amplitude: quality.amplitude,
    energy: quality.energy,
    motion: quality.motion,
    world: quality.world,
    movementRatio: quality.movementRatio,
    referenceMovement: quality.referenceMovement,
    studentMovement: quality.studentMovement,
    total,
    score: Math.round(total * 12),
    coverage: Math.round(coverage * 100),
    matchedFrames,
    referenceFrames: references.length,
    mistakes: filteredMistakes,
  };

  return result;
}

function calibratedMatchTotal(total, coverage, quality = {}) {
  const poseCore = weightedAverage(
    [
      quality.position || 0,
      quality.arms || 0,
      quality.legs || 0,
      quality.body || 0,
      quality.amplitude || 0,
      quality.motion || 0,
      quality.world || 0,
    ],
    [0.25, 0.19, 0.17, 0.11, 0.1, 0.11, 0.07],
  );
  const weakMetric = Math.min(
    quality.arms || 0,
    quality.legs || 0,
    quality.body || 0,
    quality.position || 0,
    quality.timing || 0,
    quality.amplitude || 0,
    quality.motion || 0,
    quality.world || 0,
  );
  const movementRatio = Number.isFinite(quality.movementRatio) ? quality.movementRatio : 1;
  const hasMovingReference = (quality.referenceMovement || 0) > 0.16;
  const caps = [
    coverage < 0.55 ? 35 : 100,
    coverage < 0.72 ? 55 : 100,
    coverage < 0.86 ? 72 : 100,
    hasMovingReference && movementRatio < 0.18 ? 22 : 100,
    hasMovingReference && movementRatio < 0.32 ? 38 : 100,
    hasMovingReference && movementRatio < 0.52 ? 58 : 100,
    weakMetric < 38 ? 58 : 100,
    weakMetric < 52 ? 76 : 100,
    poseCore < 70 ? 84 : 100,
  ];
  return Math.round(Math.min(total, ...caps));
}

function calibratedMetricScore(total, coverage) {
  return Math.round(total * Math.min(1, Math.max(0.35, coverage)));
}

function filterReportedMistakes(mistakes, total, coverage) {
  if (total >= 94 && coverage >= 0.96) return [];
  const severeThreshold = total >= 75 ? 58 : 68;
  return mistakes
    .filter((item) => item.score < severeThreshold)
    .sort((a, b) => a.score - b.score)
    .filter((item, index, list) => index === 0 || Math.abs(item.time - list[index - 1].time) > 0.8)
    .slice(0, 6);
}

function reconcileMicroJitterScores(scores) {
  const shape = weightedAverage([scores.position, scores.arms, scores.legs, scores.body, scores.amplitude], [0.34, 0.2, 0.18, 0.16, 0.12]);
  if (shape >= 86 && scores.timing >= 82) {
    return {
      ...scores,
      trajectory: Math.max(scores.trajectory, 82),
      energy: Math.max(scores.energy, 78),
    };
  }
  return scores;
}

function shouldReportMistake(scores) {
  return grossMistakeScore(scores) < 68;
}

function weakestMomentLabel(scores) {
  const labels = {
    arms: "руки отличаются от эталона",
    legs: "ноги отличаются от эталона",
    body: "корпус не совпал",
    timing: "не попал в музыку",
    trajectory: "траектория движения другая",
    amplitude: "амплитуда отличается",
    energy: "скорость/энергия движения другая",
    motion: "слишком мало движения",
    world: "3D-форма тела отличается",
    position: "форма позы отличается",
  };
  const [key] =
    Object.entries({
      arms: scores.arms,
      legs: scores.legs,
      body: scores.body,
      timing: scores.timing,
      amplitude: scores.amplitude,
      motion: scores.motion,
      world: scores.world,
      position: scores.position,
    }).sort((a, b) => a[1] - b[1])[0] || ["position"];
  return labels[key] || labels.position;
}

function grossMistakeScore(scores) {
  return Math.min(
    scores.position,
    scores.arms,
    scores.legs,
    scores.body,
    scores.timing,
    scores.amplitude,
    scores.trajectory,
    scores.motion,
    scores.world,
  );
}

function nearestStudentSample(time) {
  let best = null;
  let diff = Infinity;

  for (const item of state.studentRecording) {
    const nextDiff = Math.abs(item.time - time);
    if (nextDiff < diff) {
      best = item;
      diff = nextDiff;
    }
  }

  return best;
}

function previousReferenceSample(time) {
  return previousSample(state.reference, time);
}

function nextReferenceSample(time) {
  return nextSample(state.reference, time);
}

function previousStudentSample(time) {
  return previousSample(state.studentRecording, time);
}

function nextStudentSample(time) {
  return nextSample(state.studentRecording, time);
}

function previousSample(samples, time) {
  let result = null;
  for (const item of samples) {
    if (item.time < time) result = item;
    if (item.time >= time) break;
  }
  return result;
}

function nextSample(samples, time) {
  return samples.find((item) => item.time > time) || null;
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function weightedAverage(values, weights) {
  const totalWeight = weights.reduce((sum, value) => sum + value, 0) || 1;
  return values.reduce((sum, value, index) => sum + value * weights[index], 0) / totalWeight;
}

function movementSignature(landmarks) {
  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
  const shoulderWidth = Math.max(0.3, Math.abs(leftShoulder.x - rightShoulder.x));
  const torsoHeight = Math.max(
    0.4,
    (Math.hypot(leftShoulder.x - leftHip.x, leftShoulder.y - leftHip.y) +
      Math.hypot(rightShoulder.x - rightHip.x, rightShoulder.y - rightHip.y)) /
      2,
  );

  return {
    leftArm: limbCategory(angleAt(landmarks[11], landmarks[13], landmarks[15]), leftWrist, leftShoulder),
    rightArm: limbCategory(angleAt(landmarks[12], landmarks[14], landmarks[16]), rightWrist, rightShoulder),
    leftLeg: bendCategory(angleAt(landmarks[23], landmarks[25], landmarks[27]), [2.55, 2.05]),
    rightLeg: bendCategory(angleAt(landmarks[24], landmarks[26], landmarks[28]), [2.55, 2.05]),
    stance: Math.abs(landmarks[27].x - landmarks[28].x) / shoulderWidth,
    torso: torsoCategory(leftShoulder, rightShoulder, leftHip, rightHip),
    level: ((leftShoulder.y + rightShoulder.y) / 2 - (leftHip.y + rightHip.y) / 2) / torsoHeight,
    armSpread: (Math.abs(leftWrist.x - rightWrist.x) + Math.abs(leftWrist.y - rightWrist.y)) / shoulderWidth,
    reach: (distance(leftWrist, leftShoulder) + distance(rightWrist, rightShoulder)) / (2 * torsoHeight),
  };
}

function limbCategory(angle, wrist, shoulder) {
  const bend = bendCategory(angle, [2.55, 1.75]);
  const height = wrist.y < shoulder.y - 0.25 ? "up" : wrist.y > shoulder.y + 0.28 ? "down" : "middle";
  const side = Math.abs(wrist.x - shoulder.x) > 0.45 ? "open" : "near";
  return `${bend}_${height}_${side}`;
}

function bendCategory(angle, [straight, bent]) {
  if (angle === null) return "unknown";
  if (angle >= straight) return "straight";
  if (angle >= bent) return "soft";
  return "bent";
}

function torsoCategory(leftShoulder, rightShoulder, leftHip, rightHip) {
  const shoulderCenter = midpoint(leftShoulder, rightShoulder);
  const hipCenter = midpoint(leftHip, rightHip);
  const dx = shoulderCenter.x - hipCenter.x;
  const dy = shoulderCenter.y - hipCenter.y;
  if (Math.abs(dx) > 0.28) return dx > 0 ? "right_tilt" : "left_tilt";
  if (dy > -0.72) return "low";
  return "upright";
}

function jointCategoryGroupScore(reference, student, keys) {
  const scores = keys.map((key) => categoryOrNumberScore(reference[key], student[key]));
  return average(scores);
}

function poseShapeScore(reference, student) {
  return weightedAverage(
    [
      jointCategoryGroupScore(reference, student, ["leftArm", "rightArm"]),
      jointCategoryGroupScore(reference, student, ["leftLeg", "rightLeg", "torso"]),
      amplitudeScore(reference, student),
    ],
    [0.42, 0.38, 0.2],
  );
}

function categoryOrNumberScore(reference, student) {
  if (typeof reference === "number" && typeof student === "number") {
    return numericSimilarity(reference, student, 0.035, 42);
  }
  if (reference === student) return 100;
  if (String(reference).split("_")[0] === String(student).split("_")[0]) return 72;
  return 34;
}

function classifyMovementMoment(current, previous, next) {
  const velocity = movementVelocity(previous, next);
  const before = movementVelocity(previous, current);
  const after = movementVelocity(current, next);
  if (velocity > 2.2 || Math.abs(before - after) > 1.35) return "accent";
  if (velocity > 0.75) return "transition";
  return "hold";
}

function adaptiveMomentScore(scores, movementType) {
  const weights =
    movementType === "accent"
      ? { position: 0.35, timing: 0.2, trajectory: 0.1, amplitude: 0.09, energy: 0.07, motion: 0.12, world: 0.07 }
      : movementType === "transition"
        ? { position: 0.32, timing: 0.17, trajectory: 0.12, amplitude: 0.13, energy: 0.08, motion: 0.12, world: 0.06 }
        : { position: 0.49, timing: 0.19, trajectory: 0.04, amplitude: 0.11, energy: 0.03, motion: 0.07, world: 0.07 };

  const base =
    scores.position * weights.position +
    scores.timing * weights.timing +
    scores.trajectory * weights.trajectory +
    scores.amplitude * weights.amplitude +
    scores.energy * weights.energy +
    scores.motion * weights.motion +
    scores.world * weights.world;
  const limbGuard = Math.min(scores.arms, scores.legs, scores.body, scores.motion, scores.world);
  const detailGuard = Math.min(scores.chest ?? 100, scores.head ?? 100, scores.fingers ?? 100);
  const guardedBase =
    limbGuard < 45
      ? base * 0.68 + limbGuard * 0.32
      : base * 0.86 + limbGuard * 0.1 + Math.min(100, detailGuard) * 0.04;
  return Math.round(guardedBase);
}

function trajectoryScore(referencePrevious, referenceNext, studentPrevious, studentNext) {
  const referenceVector = movementVector(referencePrevious, referenceNext);
  const studentVector = movementVector(studentPrevious, studentNext);
  if (!referenceVector && !studentVector) return 88;
  if (!referenceVector || !studentVector) return 48;
  const referenceDistance = vectorDistance(referenceVector);
  const studentDistance = vectorDistance(studentVector);
  if (referenceDistance < 0.035 && studentDistance < 0.035) return 88;
  if (referenceDistance < 0.035 || studentDistance < 0.035) return 42;
  return directionSimilarity(referenceVector, studentVector);
}

function amplitudeScore(reference, student) {
  return weightedAverage(
    [
      numericSimilarity(reference.armSpread, student.armSpread, 0.045, 34),
      numericSimilarity(reference.reach, student.reach, 0.045, 36),
      numericSimilarity(reference.stance, student.stance, 0.045, 36),
      numericSimilarity(reference.level, student.level, 0.04, 38),
    ],
    [0.3, 0.26, 0.24, 0.2],
  );
}

function energyScore(referencePrevious, referenceNext, studentPrevious, studentNext) {
  const referenceVector = movementVector(referencePrevious, referenceNext);
  const studentVector = movementVector(studentPrevious, studentNext);
  if (!referenceVector && !studentVector) return 88;
  if (!referenceVector || !studentVector) return 44;
  const referenceVelocity = vectorVelocity(referenceVector);
  const studentVelocity = vectorVelocity(studentVector);
  return numericSimilarity(referenceVelocity, studentVelocity, 0.05, 24);
}

function worldPoseScore(referenceWorldLandmarks, studentWorldLandmarks) {
  if (!referenceWorldLandmarks?.length || !studentWorldLandmarks?.length) return 78;
  const worldPoints = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  const scores = worldPoints
    .map((index) => {
      const reference = referenceWorldLandmarks[index];
      const student = studentWorldLandmarks[index];
      if (!reference || !student || reference.visibility < 0.25 || student.visibility < 0.25) return null;
      const distance3d = Math.hypot(reference.x - student.x, reference.y - student.y, reference.z - student.z);
      return Math.max(0, 100 - distance3d * 42);
    })
    .filter((score) => score !== null);

  return scores.length ? average(scores) : 78;
}

function motionScore(referencePrevious, referenceNext, studentPrevious, studentNext) {
  const referenceVector = movementVector(referencePrevious, referenceNext);
  const studentVector = movementVector(studentPrevious, studentNext);
  if (!referenceVector && !studentVector) return 92;
  if (!referenceVector) return 78;
  const referenceDistance = vectorDistance(referenceVector);
  const studentDistance = studentVector ? vectorDistance(studentVector) : 0;
  if (referenceDistance < 0.035) return studentDistance < 0.06 ? 92 : 72;
  const ratio = studentDistance / Math.max(referenceDistance, 0.001);
  const ratioScore =
    ratio < 0.18
      ? 8
      : ratio < 0.32
        ? 26
        : ratio < 0.52
          ? 48
          : ratio > 1.85
            ? 58
            : numericSimilarity(ratio, 1, 0.22, 82);
  const directionScore = studentVector ? directionSimilarity(referenceVector, studentVector) : 0;
  return weightedAverage([ratioScore, directionScore], [0.72, 0.28]);
}

function motionStatsForAttempt(referenceSamples, studentSamples) {
  const referenceMovement = totalMovement(referenceSamples);
  const studentMovement = totalMovement(studentSamples);
  if (referenceMovement < 0.16) {
    return {
      score: studentMovement < 0.2 ? 92 : 72,
      ratio: 1,
      referenceMovement,
      studentMovement,
    };
  }
  const ratio = studentMovement / Math.max(referenceMovement, 0.001);
  const score =
    ratio < 0.18
      ? 8
      : ratio < 0.32
        ? 24
        : ratio < 0.52
          ? 46
          : ratio > 1.9
            ? 56
            : numericSimilarity(ratio, 1, 0.2, 78);
  return {
    score,
    ratio,
    referenceMovement,
    studentMovement,
  };
}

function totalMovement(samples) {
  let total = 0;
  for (let index = 1; index < samples.length; index += 1) {
    const vector = movementVector(samples[index - 1], samples[index]);
    if (vector) total += vectorDistance(vector);
  }
  return total;
}

function movementVelocity(previous, next) {
  const vector = movementVector(previous, next);
  if (!vector) return 0;
  return vectorVelocity(vector);
}

function vectorVelocity(vector) {
  return Math.hypot(vector.x, vector.y) / Math.max(0.05, vector.dt);
}

function vectorDistance(vector) {
  return Math.hypot(vector.x, vector.y);
}

function movementVector(previous, next) {
  if (!previous?.landmarks || !next?.landmarks || next.time <= previous.time) return null;
  const points = [11, 12, 15, 16, 23, 24, 27, 28];
  const start = averagePoint(previous.landmarks, points);
  const end = averagePoint(next.landmarks, points);
  return { x: end.x - start.x, y: end.y - start.y, dt: next.time - previous.time };
}

function directionSimilarity(reference, student) {
  const refMag = Math.hypot(reference.x, reference.y);
  const studentMag = Math.hypot(student.x, student.y);
  if (refMag < 0.02 && studentMag < 0.02) return 96;
  if (refMag < 0.02 || studentMag < 0.02) return 72;
  const dot = (reference.x * student.x + reference.y * student.y) / (refMag * studentMag);
  return Math.max(0, Math.min(100, ((dot + 1) / 2) * 100));
}

function numericSimilarity(reference, student, tolerance, penalty) {
  const diff = Math.max(0, Math.abs(reference - student) - tolerance);
  return Math.max(0, 100 - diff * penalty);
}

function averagePoint(landmarks, points) {
  const visible = points.map((index) => landmarks[index]).filter((point) => point && point.visibility > 0.25);
  const list = visible.length ? visible : points.map((index) => landmarks[index]).filter(Boolean);
  return {
    x: average(list.map((point) => point.x)),
    y: average(list.map((point) => point.y)),
  };
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
}

function poseAngles(landmarks) {
  return Object.fromEntries(
    Object.entries(ANGLES).map(([group, triples]) => [
      group,
      triples.map(([a, b, c]) => angleAt(landmarks[a], landmarks[b], landmarks[c])),
    ]),
  );
}

function angleAt(a, b, c) {
  if (!a || !b || !c) return null;
  const ab = { x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) };
  const cb = { x: c.x - b.x, y: c.y - b.y, z: (c.z || 0) - (b.z || 0) };
  const dot = ab.x * cb.x + ab.y * cb.y + ab.z * cb.z;
  const magA = Math.hypot(ab.x, ab.y, ab.z);
  const magC = Math.hypot(cb.x, cb.y, cb.z);
  if (!magA || !magC) return null;
  return Math.acos(Math.max(-1, Math.min(1, dot / (magA * magC))));
}

function angleGroupScore(referenceAngles, studentAngles) {
  const scores = referenceAngles
    .map((ref, index) => {
      const student = studentAngles[index];
      if (ref === null || student === null) return null;
      const diff = Math.abs(ref - student);
      return Math.max(0, 100 - (diff / Math.PI) * 160);
    })
    .filter((score) => score !== null);

  if (!scores.length) return 0;
  return scores.reduce((sum, value) => sum + value, 0) / scores.length;
}

function timingScore(referenceTime, currentTime) {
  const diff = Math.abs(referenceTime - currentTime);
  const tolerance = 0.035;
  return Math.max(0, 100 - Math.max(0, diff - tolerance) * 190);
}

function landmarkGroupScore(referenceLandmarks, studentLandmarks) {
  if (!referenceLandmarks || !studentLandmarks) return 0;

  const scores = POSITION_POINTS.map((index) => {
    const reference = referenceLandmarks[index];
    const student = studentLandmarks[index];
    if (!reference || !student || reference.visibility < 0.25 || student.visibility < 0.25) return null;

    const distance = Math.hypot(reference.x - student.x, reference.y - student.y, (reference.z || 0) - (student.z || 0));
    return Math.max(0, 100 - distance * 95);
  }).filter((score) => score !== null);

  return average(scores);
}

function normalizeLandmarks(landmarks) {
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const center = {
    x: (leftHip.x + rightHip.x) / 2,
    y: (leftHip.y + rightHip.y) / 2,
    z: ((leftHip.z || 0) + (rightHip.z || 0)) / 2,
  };
  const scale = Math.hypot(leftShoulder.x - rightHip.x, leftShoulder.y - rightHip.y) || 1;

  return landmarks.map((point) => ({
    x: (point.x - center.x) / scale,
    y: (point.y - center.y) / scale,
    z: ((point.z || 0) - center.z) / scale,
    visibility: point.visibility || 0,
  }));
}

function normalizeWorldLandmarks(landmarks) {
  if (!landmarks?.length) return null;
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  if (!leftHip || !rightHip || !leftShoulder || !rightShoulder) return null;

  const center = {
    x: (leftHip.x + rightHip.x) / 2,
    y: (leftHip.y + rightHip.y) / 2,
    z: ((leftHip.z || 0) + (rightHip.z || 0)) / 2,
  };
  const shoulderSpan = distance(leftShoulder, rightShoulder);
  const torsoSpan =
    (distance(leftShoulder, leftHip) + distance(rightShoulder, rightHip) + distance(leftShoulder, rightHip)) / 3;
  const scale = Math.max(0.001, shoulderSpan * 0.45 + torsoSpan * 0.55);

  return landmarks.map((point) => ({
    x: (point.x - center.x) / scale,
    y: (point.y - center.y) / scale,
    z: ((point.z || 0) - center.z) / scale,
    visibility: point.visibility ?? 1,
  }));
}

function drawPose(ctx, canvas, landmarks, color) {
  const video = canvas === teacherCanvas ? teacherVideo : studentVideo;
  resizeCanvasToVideo(canvas, video);
  const rect = getVideoDrawRect(canvas, video);
  clearCanvas(ctx, canvas);
  ctx.lineWidth = 5;
  ctx.fillStyle = color;
  ctx.lineCap = "round";

  BONES.forEach(([from, to]) => {
    const a = landmarks[from];
    const b = landmarks[to];
    if (!shouldDrawBone(a, b, from, to, rect)) return;
    ctx.globalAlpha = Math.min(1, Math.max(0.35, ((a.visibility || 1) + (b.visibility || 1)) / 2));
    ctx.strokeStyle = boneColor(from, to, color);
    ctx.beginPath();
    ctx.moveTo(toCanvasX(a, rect), toCanvasY(a, rect));
    ctx.lineTo(toCanvasX(b, rect), toCanvasY(b, rect));
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  landmarks.forEach((point, index) => {
    if (!shouldDrawPoint(point, index, landmarks, rect)) return;
    const radius = index === 0 ? 7 : index < 11 ? 4 : index >= 17 && index <= 22 ? 4 : 5;
    ctx.beginPath();
    ctx.fillStyle = boneColor(index, index, color);
    ctx.arc(toCanvasX(point, rect), toCanvasY(point, rect), radius + 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#fff7c2";
    ctx.arc(toCanvasX(point, rect), toCanvasY(point, rect), radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function boneColor(from, to, fallback) {
  if ([11, 12, 23, 24].includes(from) || [11, 12, 23, 24].includes(to)) return fallback;
  if ([13, 14, 15, 16, 17, 18, 19, 20, 21, 22].includes(from) || [13, 14, 15, 16, 17, 18, 19, 20, 21, 22].includes(to)) {
    return "#2dd4bf";
  }
  if ([25, 26, 27, 28, 31, 32].includes(from) || [25, 26, 27, 28, 31, 32].includes(to)) {
    return "#f5c542";
  }
  return fallback;
}

function isVisible(point) {
  return point && (point.visibility === undefined || point.visibility > 0.28);
}

function shouldDrawPoint(point, index, landmarks, rect) {
  if (!isVisible(point) || HIDDEN_FACE_POINTS.has(index) || HIDDEN_HAND_POINTS.has(index)) return false;
  if (isCollapsedIntoTorso(point, index, landmarks, rect)) return false;
  return true;
}

function shouldDrawBone(a, b, from, to, rect) {
  if (!isVisible(a) || !isVisible(b)) return false;
  if (HIDDEN_FACE_POINTS.has(from) || HIDDEN_FACE_POINTS.has(to) || HIDDEN_HAND_POINTS.has(from) || HIDDEN_HAND_POINTS.has(to)) return false;
  if (!isSanePixelSegment(a, b, rect, 6, 0.74)) return false;
  return true;
}

function isSanePixelSegment(a, b, rect, minPixels, maxRatio) {
  const distance = pixelDistance(a, b, rect);
  const maxPixels = Math.max(rect.width, rect.height) * maxRatio;
  return distance >= minPixels && distance <= maxPixels;
}

function pixelDistance(a, b, rect) {
  return Math.hypot(toCanvasX(a, rect) - toCanvasX(b, rect), toCanvasY(a, rect) - toCanvasY(b, rect));
}

function isCollapsedIntoTorso(point, index, landmarks, rect) {
  if ([0, 11, 12, 23, 24].includes(index)) return false;
  const anchors = [landmarks[11], landmarks[12], landmarks[23], landmarks[24]].filter(isVisible);
  if (anchors.length < 2) return false;
  const minDistance = Math.min(
    ...anchors.map((anchor) =>
      Math.hypot(toCanvasX(point, rect) - toCanvasX(anchor, rect), toCanvasY(point, rect) - toCanvasY(anchor, rect)),
    ),
  );
  return minDistance < 5;
}

function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvasToVideo(canvas, video) {
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round((canvas.clientWidth || video.clientWidth || 640) * dpr));
  const height = Math.max(1, Math.round((canvas.clientHeight || video.clientHeight || 360) * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function getVideoDrawRect(canvas, video) {
  const canvasRatio = canvas.width / canvas.height;
  const videoRatio = (video.videoWidth || canvas.width) / (video.videoHeight || canvas.height);

  if (videoRatio > canvasRatio) {
    const width = canvas.width;
    const height = width / videoRatio;
    return { x: 0, y: (canvas.height - height) / 2, width, height };
  }

  const height = canvas.height;
  const width = height * videoRatio;
  return { x: (canvas.width - width) / 2, y: 0, width, height };
}

function toCanvasX(point, rect) {
  return rect.x + point.x * rect.width;
}

function toCanvasY(point, rect) {
  return rect.y + point.y * rect.height;
}

function updateMeters(scores) {
  els.armsMeter.value = scores.arms;
  els.legsMeter.value = scores.legs;
  els.bodyMeter.value = scores.body;
  els.chestMeter.value = scores.chest;
  els.headMeter.value = scores.amplitude ?? scores.head;
  els.fingersMeter.value = scores.energy ?? scores.fingers;
  els.positionMeter.value = scores.trajectory ?? scores.position;
  els.timeMeter.value = scores.timing;
  els.matchValue.textContent = `${scores.total}%`;
  els.matchLabel.textContent = `${renderStars(matchToStars(scores.total))} · ${scores.total >= 92 ? "точно" : scores.total >= 78 ? "хорошо" : scores.total >= 62 ? "средне" : "тренировать"}`;
  els.matchArc.style.strokeDashoffset = String(314 - (314 * scores.total) / 100);
}

function emptyScores() {
  return {
    arms: 0,
    legs: 0,
    body: 0,
    chest: 0,
    head: 0,
    fingers: 0,
    position: 0,
    trajectory: 0,
    amplitude: 0,
    energy: 0,
    motion: 0,
    world: 0,
    timing: 0,
    total: 0,
    score: 0,
  };
}

function updateScore(value) {
  updateLevelDisplay();
}

function matchToStars(match) {
  if (match >= 94) return 5;
  if (match >= 84) return 4;
  if (match >= 70) return 3;
  if (match >= 52) return 2;
  if (match >= 32) return 1;
  return 0;
}

function renderStars(count) {
  return `${"★".repeat(count)}${"☆".repeat(5 - count)}`;
}

function totalStars() {
  return state.attempts.reduce((sum, attempt) => {
    const stars = Number.isFinite(attempt.stars) ? attempt.stars : matchToStars(attempt.match || 0);
    return sum + stars;
  }, 0);
}

function levelInfoFromStars(stars) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (stars >= level.stars) current = level;
  }

  const next = LEVELS.find((level) => level.stars > stars) || null;
  return { current, next };
}

function updateLevelDisplay() {
  const stars = totalStars();
  const { current, next } = levelInfoFromStars(stars);
  const previousStars = current.stars;
  const nextStars = next?.stars || current.stars;
  const progress = next ? ((stars - previousStars) / Math.max(1, nextStars - previousStars)) * 100 : 100;
  const levelEarned = stars - previousStars;
  const levelTarget = Math.max(0, nextStars - previousStars);

  els.scoreValue.textContent = `Ур. ${current.level}`;
  els.levelNameValue.textContent = current.name;
  els.levelProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  els.levelNextValue.textContent = next
    ? `${Math.max(0, levelTarget - levelEarned)} из ${levelTarget} ${pluralizeStars(levelTarget)} до уровня ${next.level}`
    : "максимальный уровень";
  els.scoreValue.title = `${stars} звезд всего`;
  els.levelCardButton.removeAttribute("title");
  els.studentStarsBadge.textContent = `★ ${stars}`;
}

function showLevelOverlay() {
  renderDancerProfileDetails();
  renderLevelHistory();
  els.studentStudioProfilePage.hidden = true;
  els.levelOverlay.hidden = false;
  els.appShell.classList.add("dancer-profile-open");
  els.appShell.classList.remove("student-studio-open");
  updateAccountNav("profile");
  els.levelOverlay.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openLevelHistory() {
  renderLevelHistory();
  els.levelHistoryOverlay.hidden = false;
}

function closeLevelHistory() {
  els.levelHistoryOverlay.hidden = true;
}

function showStudentStudioProfile() {
  state.studentStudioGroupOpen = false;
  state.studentStudioSubgroupIds = [];
  renderStudentStudioProfile();
  els.levelOverlay.hidden = true;
  els.studentStudioProfilePage.hidden = false;
  els.appShell.classList.add("student-studio-open");
  els.appShell.classList.remove("dancer-profile-open");
  updateAccountNav("studio");
  els.studentStudioProfilePage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderStudentStudioProfile() {
  const studio = activeTeacherStudio() || {};
  const studioName = state.studentProfile?.studioName || studio.name || "Танцевальная студия";
  const access = studentStudioAccess(studio);
  els.studentStudioProfileTitle.textContent = studioName;
  els.studentStudioProfileDescription.textContent = studio.description || "Здесь будут направления, расписание, достижения и общая жизнь студии.";
  els.studentStudioProfileLogo.textContent = studio.image ? "" : (studioName || "С").slice(0, 1).toUpperCase();
  els.studentStudioProfileLogo.style.backgroundImage = studio.image ? `url("${studio.image}")` : "";
  els.studentStudioProfileCoverImage.hidden = !studio.cover;
  if (studio.cover) els.studentStudioProfileCoverImage.src = studio.cover;
  else els.studentStudioProfileCoverImage.removeAttribute("src");
  els.studentStudioProfileFacts.innerHTML = `
    <div class="studio-fact">
      <span class="studio-fact-icon" aria-hidden="true">⌖</span>
      <div><small>Адрес</small><strong>${escapeHtml(studio.address || studio.city || "Не указан")}</strong></div>
    </div>
    <div class="studio-fact">
      <span class="studio-fact-icon" aria-hidden="true">♪</span>
      <div><small>Направления</small><strong>${escapeHtml(studio.directions || "Пока не указаны")}</strong></div>
    </div>
    <div class="studio-fact">
      <span class="studio-fact-icon" aria-hidden="true">◎</span>
      <div><small>Группа</small><strong>${escapeHtml(access.group?.name || "Пока не назначена")}</strong></div>
    </div>
    <div class="studio-fact">
      <span class="studio-fact-icon" aria-hidden="true">+</span>
      <div><small>Статус</small><strong>Участник студии</strong></div>
    </div>
  `;
  renderAchievementsInto(els.studentStudioAchievementsList, studio.achievements);
  renderStudentStudioMaterials(studio, access);
}

function studentStudioAccess(studio = {}) {
  const profile = state.studentProfile || {};
  const groupId = profile.groupId || profile.requestedGroupId || profile.studioGroupId || "";
  const studentRecord = findStudentRecordForProfile(studio, profile);
  const recordGroupId = studentRecord?.groupId || studentRecord?.requestedGroupId || "";
  const groupMatch = findStudioGroupById(studio, groupId || recordGroupId);
  const fallbackGroup = firstStudioGroup(studio);
  const group = groupMatch?.group || fallbackGroup || null;
  return {
    group,
    path: groupMatch?.path || (fallbackGroup ? [fallbackGroup] : []),
    lessons: accessibleLessonsForGroup(group),
  };
}

function findStudentRecordForProfile(studio = {}, profile = {}) {
  const students = Array.isArray(studio.students) ? studio.students : [];
  if (!students.length || !profile) return null;
  return students.find((student) => student.id && student.id === profile.id) ||
    students.find((student) => {
      const firstNameMatches = !student.firstName || !profile.firstName || student.firstName.trim().toLowerCase() === profile.firstName.trim().toLowerCase();
      const lastNameMatches = !student.lastName || !profile.lastName || student.lastName.trim().toLowerCase() === profile.lastName.trim().toLowerCase();
      return firstNameMatches && lastNameMatches && (student.firstName || student.lastName);
    }) ||
    null;
}

function findStudioGroupById(studio = {}, groupId = "") {
  if (!groupId) return null;
  const walk = (items = [], path = []) => {
    for (const group of items) {
      const nextPath = [...path, group];
      if (group.id === groupId) return { group, path: nextPath };
      const nested = walk(group.subgroups || [], nextPath);
      if (nested) return nested;
    }
    return null;
  };
  return walk(studio.groups || []);
}

function firstStudioGroup(studio = {}) {
  return Array.isArray(studio.groups) && studio.groups.length ? studio.groups[0] : null;
}

function accessibleLessonsForGroup(group) {
  if (!group) return [];
  const lessons = [];
  const walk = (container) => {
    lessons.push(...(container.lessons || []).filter((lesson) => lesson.published || lesson.hasVideo || lesson.status === "published"));
    (container.subgroups || []).forEach(walk);
  };
  walk(group);
  return lessons;
}

function renderStudentStudioMaterials(studio = {}, access = studentStudioAccess(studio)) {
  if (!els.studentStudioMaterialsList) return;
  const studioName = state.studentProfile?.studioName || studio.name || "Студия";
  if (!access.group) {
    if (els.studentStudioMaterialsTitle) els.studentStudioMaterialsTitle.textContent = "Доступные уроки";
    if (els.studentStudioMaterialsBreadcrumb) els.studentStudioMaterialsBreadcrumb.textContent = studioName;
    if (els.studentStudioMaterialsPath) els.studentStudioMaterialsPath.innerHTML = "";
    if (els.studentStudioMaterialsBack) els.studentStudioMaterialsBack.hidden = true;
    els.studentStudioMaterialsList.innerHTML = studentEmptyLessonCard(
      "Группа пока не назначена",
      "Когда педагог добавит вас в группу, здесь появятся доступные уроки."
    );
    return;
  }
  const currentPath = studentAccessCurrentPath(access);
  const currentFolder = currentPath.length ? currentPath[currentPath.length - 1] : null;
  const currentContainer = currentFolder || access.group;
  const isRoot = !state.studentStudioGroupOpen;
  if (els.studentStudioMaterialsTitle) {
    els.studentStudioMaterialsTitle.textContent = isRoot ? "Материалы студии" : (currentContainer.name || "Материалы группы");
  }
  renderStudentMaterialsPath(access, currentPath, studioName);
  if (els.studentStudioMaterialsBack) els.studentStudioMaterialsBack.hidden = isRoot;

  if (isRoot) {
    els.studentStudioMaterialsList.innerHTML = stripTeacherDeleteControl(
      folderButton("group", access.group)
        .replace("data-group-id=", "data-student-access-group-id=")
        .replace("folder-card-group", "folder-card-group student-current-group")
    );
    return;
  }

  const subgroupCards = (currentContainer.subgroups || []).map((subgroup) => stripTeacherDeleteControl(
    folderButton("subgroup", subgroup)
      .replace("data-subgroup-id=", "data-student-access-subgroup-id=")
  ));
  const lessonCards = (currentContainer.lessons || [])
    .filter(isLessonAccessible)
    .map((lesson) => studentAccessibleLessonCard(lesson));
  const cards = [...subgroupCards, ...lessonCards];
  els.studentStudioMaterialsList.innerHTML = cards.length
    ? cards.join("")
    : studentEmptyLessonCard("Скоро здесь будет урок", "Педагог добавит материалы — они появятся в этой папке.");
}

function studentAccessibleLessonCard(lesson) {
  return stripTeacherDeleteControl(lessonFolderCard(lesson)).replace("data-lesson-id=", "data-student-access-lesson-id=");
}

function studentEmptyLessonCard(title, text) {
  return `
    <article class="student-empty-lesson-card" aria-label="${escapeHtml(title)}">
      <span class="student-empty-lesson-icon" aria-hidden="true">•</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(text)}</small>
    </article>
  `;
}

function stripTeacherDeleteControl(html = "") {
  return html.replace(/\s*<span class="folder-delete"[\s\S]*?<\/span>/, "");
}

function openStudentAccessibleLesson(lessonId) {
  const studio = activeTeacherStudio();
  const access = studentStudioAccess(studio);
  const lesson = access.lessons.find((item) => item.id === lessonId);
  if (!lesson) return;
  state.teacherWorkspace.activeLessonId = lesson.id;
  goStudentHome();
  focusDanceStage();
}

function isLessonAccessible(lesson = {}) {
  return lesson.published || lesson.hasVideo || lesson.status === "published";
}

function studentAccessCurrentPath(access = {}) {
  const path = [];
  let cursor = access.group;
  for (const subgroupId of state.studentStudioSubgroupIds || []) {
    const next = cursor?.subgroups?.find((subgroup) => subgroup.id === subgroupId);
    if (!next) break;
    path.push(next);
    cursor = next;
  }
  return path;
}

function renderStudentMaterialsPath(access = {}, currentPath = [], studioName = "Студия") {
  const crumbs = [access.group, ...currentPath].filter(Boolean);
  const fullPath = [studioName, ...crumbs.map((item, index) => item.name || (index ? "Подгруппа" : "Группа"))];
  if (els.studentStudioMaterialsBreadcrumb) {
    els.studentStudioMaterialsBreadcrumb.innerHTML = fullPath.map((label, index) => {
      const safeLabel = escapeHtml(label);
      return index === 0 ? `<span>${safeLabel}</span>` : `<b>/</b><span>${safeLabel}</span>`;
    }).join("");
  }
  if (els.studentStudioMaterialsPath) {
    els.studentStudioMaterialsPath.innerHTML = "";
  }
}

function openStudentAccessGroup(groupId) {
  const access = studentStudioAccess(activeTeacherStudio());
  if (!access.group || access.group.id !== groupId) return;
  state.studentStudioGroupOpen = true;
  state.studentStudioSubgroupIds = [];
  renderStudentStudioMaterials(activeTeacherStudio(), access);
}

function openStudentAccessSubgroup(subgroupId) {
  const access = studentStudioAccess(activeTeacherStudio());
  state.studentStudioGroupOpen = true;
  const currentPath = studentAccessCurrentPath(access);
  const currentContainer = currentPath.length ? currentPath[currentPath.length - 1] : access.group;
  const subgroup = currentContainer?.subgroups?.find((item) => item.id === subgroupId);
  if (!subgroup) return;
  state.studentStudioSubgroupIds.push(subgroup.id);
  renderStudentStudioMaterials(activeTeacherStudio(), access);
}

function backStudentStudioFolder() {
  if (!state.studentStudioSubgroupIds.length) {
    state.studentStudioSubgroupIds = [];
    state.studentStudioGroupOpen = false;
  } else {
    state.studentStudioSubgroupIds.pop();
  }
  renderStudentStudioMaterials(activeTeacherStudio(), studentStudioAccess(activeTeacherStudio()));
}

function renderDancerProfileDetails() {
  if (!els.studentProfileDetails) return;
  const profile = state.studentProfile || {};
  const stars = totalStars();
  const { current, next } = levelInfoFromStars(stars);
  const attemptsCount = state.attempts.length;
  const bestAttempt = state.attempts.reduce((best, attempt) => Math.max(best, attempt.match || 0), 0);
  const styles = Array.isArray(profile.styles) && profile.styles.length ? profile.styles : ["Не указаны"];
  const ageText = Number.isFinite(profile.age) && profile.age > 0 ? `${profile.age} лет` : "возраст не указан";
  const studioName = profile.studioName || "Танцевальная студия";
  const firstName = profile.firstName || "Юный";
  const lastName = profile.lastName || "танцор";
  const nextText = next ? `${Math.max(0, next.stars - stars)} ★ до уровня ${next.level}` : "все уровни открыты";
  const previousStars = current.stars;
  const nextStars = next?.stars || current.stars;
  const progress = next ? Math.min(100, Math.max(0, ((stars - previousStars) / Math.max(1, nextStars - previousStars)) * 100)) : 100;
  const coverStyle = profile.coverImage ? ` style="background-image: url('${escapeHtml(profile.coverImage)}')"` : "";
  const avatarStyle = profile.avatarImage ? ` style="background-image: url('${escapeHtml(profile.avatarImage)}')"` : "";
  const avatarLetter = profile.avatarImage ? "" : escapeHtml((firstName || "Т").slice(0, 1).toUpperCase());

  els.studentProfileDetails.innerHTML = `
    <div class="dancer-channel">
      <div class="dancer-channel-cover"${coverStyle}>
        <span class="dancer-cover-glow" aria-hidden="true"></span>
        <button class="dancer-cover-edit" type="button" aria-label="Редактировать обложку профиля">✎</button>
        <div class="dancer-avatar-large"${avatarStyle}>
          ${avatarLetter}
          <button class="dancer-avatar-edit" type="button" aria-label="Редактировать аватар">✎</button>
        </div>
      </div>
      <div class="dancer-channel-copy">
        <div class="dancer-channel-main">
          <h3><span>${escapeHtml(firstName)}</span><span>${escapeHtml(lastName)}</span></h3>
          <p>${escapeHtml(profile.nickname || "без никнейма")} · ${escapeHtml(ageText)}</p>
          <p class="dancer-studio-label">${escapeHtml(studioName)}</p>
          <button class="dancer-level-button" type="button" aria-label="Открыть уровни">Ур.${current.level}</button>
          <div class="dancer-level-track" aria-label="Прогресс уровня">
            <span style="width: ${progress}%"></span>
          </div>
          <div class="dancer-next">
            <span aria-hidden="true">✦</span>
            <strong>${escapeHtml(nextText)}</strong>
            <small>Продолжайте сдавать уроки — каждая попытка добавляет прогресс.</small>
          </div>
          <div class="dancer-info-grid">
            <span><b>Опыт</b><strong>${stars} ★</strong></span>
            <span><b>Пройдено уроков</b><strong>${attemptsCount}</strong></span>
            <span><b>Лучший результат</b><strong>${Math.round(bestAttempt)}%</strong></span>
            <span><b>Статус</b><strong>${escapeHtml(current.name)}</strong></span>
            <span><b>Стили</b><strong>${styles.map(escapeHtml).join(", ")}</strong></span>
            <span><b>Студии</b><strong>${escapeHtml(studioName)}</strong></span>
          </div>
        </div>
      </div>
    </div>
    ${renderDancerCompletedLessons()}
  `;
}

function renderDancerCompletedLessons() {
  const attempts = state.attempts.slice(0, 6);
  const activeLesson = activeTeacherLesson() || {};
  const cards = attempts.map((attempt, index) => {
    const stars = Number.isFinite(attempt.stars) ? attempt.stars : matchToStars(attempt.match || 0);
    const name = attempt.lessonName || activeLesson.name || `Урок ${index + 1}`;
    const image = attempt.lessonImage || activeLesson.image || "./assets/dance-lesson-thumb.png";
    const meta = attempt.at || "последняя сдача";
    return `
      <article class="completed-lesson-card">
        <span class="completed-lesson-preview">
          <img src="${escapeHtml(image)}" alt="" />
          <i aria-hidden="true">✓</i>
        </span>
        <span class="completed-lesson-copy">
          <small>${escapeHtml(meta)}</small>
          <strong>${escapeHtml(name)}</strong>
          <b>${renderStars(stars)}</b>
        </span>
      </article>
    `;
  }).join("");
  return `
    <section class="completed-lessons-panel" aria-label="Пройденные уроки">
      <div class="completed-lessons-head">
        <p class="eyebrow">История</p>
        <h3>Пройденные уроки</h3>
      </div>
      <div class="completed-lessons-grid">
        ${cards || `<div class="completed-lessons-empty">Здесь появятся уроки после первой сдачи.</div>`}
      </div>
    </section>
  `;
}

async function updateStudentProfileImage(event, field) {
  const file = event.target.files?.[0];
  if (!file || !state.studentProfile) return;
  const imageData = field === "coverImage"
    ? await optimizeCoverImage(file)
    : await optimizeAvatarImage(file);
  if (!imageData) return;
  state.studentProfile[field] = imageData;
  persistStudentProfile();
  renderStudentProfile();
  renderDancerProfileDetails();
}

function renderLevelHistory() {
  const stars = totalStars();
  const { current, next } = levelInfoFromStars(stars);
  const nextStars = next?.stars || current.stars;
  const currentProgress = next ? `${Math.max(0, next.stars - stars)} из ${Math.max(1, nextStars - current.stars)} до уровня ${next.level}` : "все уровни открыты";
  els.levelOverlayDetails.textContent = `Сейчас уровень ${current.level}: ${current.name}. ${currentProgress}.`;
  els.levelHistoryList.innerHTML = "";

  LEVELS.forEach((level, index) => {
    const nextLevel = LEVELS[index + 1] || null;
    const row = document.createElement("div");
    const isCompleted = stars >= (nextLevel?.stars ?? level.stars);
    const isCurrent = level.level === current.level;
    row.className = `level-row ${isCurrent ? "current" : isCompleted ? "completed" : "locked"}`;

    const badge = document.createElement("span");
    badge.textContent = isCompleted ? "✓" : isCurrent ? "★" : "•";

    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `Уровень ${level.level}: ${level.name}`;
    const subtitle = document.createElement("small");
    subtitle.textContent = levelStatusText(level, nextLevel, stars, isCurrent, isCompleted);
    text.append(title, subtitle);

    const required = document.createElement("small");
    required.textContent = `${level.stars}+`;
    row.append(badge, text, required);
    els.levelHistoryList.append(row);
  });
}

function levelStatusText(level, nextLevel, stars, isCurrent, isCompleted) {
  if (!nextLevel) return isCurrent ? "максимальный уровень" : "финальный уровень";
  const levelSpan = nextLevel.stars - level.stars;
  if (isCompleted) return "пройден";
  if (isCurrent) {
    const earned = Math.max(0, stars - level.stars);
    return `${earned} из ${levelSpan} ${pluralizeStars(levelSpan)} внутри уровня`;
  }
  return `открывается с ${level.stars} ${pluralizeStars(level.stars)}`;
}

function pluralizeStars(value) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return "звезда";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "звезды";
  return "звезд";
}

function updatePipeline(activeStep) {
  const order = ["upload", "scan", "review", "markers", "publish"];
  const activeIndex = Math.max(0, order.indexOf(activeStep));
  const hasLearningVideo = Boolean(state.learning.objectUrl);
  const hasExamVideo = Boolean(state.exam.objectUrl);
  const hasReference = state.reference.length > 0;
  const hasMarkers = hasExamVideo && clipReady(state.exam);

  els.pipelineSteps.forEach((step) => {
    const index = order.indexOf(step.dataset.step);
    const completed =
      (step.dataset.step === "upload" && hasLearningVideo && activeIndex > index) ||
      (step.dataset.step === "scan" && hasExamVideo && activeIndex > index) ||
      (step.dataset.step === "review" && hasReference && activeIndex > index) ||
      (step.dataset.step === "markers" && hasMarkers && activeStep === "publish");

    step.classList.toggle("active", index === activeIndex);
    step.classList.toggle("completed", completed);
  });

  els.appShell.dataset.teacherStep = activeStep;
  updateTeacherWizard(activeStep);
  els.publishLessonButton.disabled = !(hasReference && hasMarkers);
}

function updateTeacherWizard(activeStep) {
  const steps = {
    upload: {
      eyebrow: "Шаг 1 · Видео",
      title: state.learning.objectUrl ? "Разметьте видео обучения" : "Загрузите видео обучения",
      description: state.learning.objectUrl
        ? "Поставьте начало и конец по желанию. Этот ролик ученики будут смотреть на этапе изучения."
        : "Добавьте обучающее видео: объяснение, разбор или чистовую запись, по которой ученики будут учиться.",
      hint: state.learning.objectUrl ? "Когда видео готово, нажмите «Дальше» и загрузите эталон для проверки." : "Выберите файл в большом окне видео.",
      button: "Дальше",
      disabled: !state.learning.objectUrl,
      uploadType: "learning",
    },
    scan: {
      eyebrow: "Шаг 2 · Эталон",
      title: state.exam.objectUrl ? "Разметьте видео эталона" : "Загрузите видео эталона",
      description: state.exam.objectUrl
        ? "Поставьте начало и конец по желанию. После нажатия «Дальше» система считает эталон движения."
        : "Добавьте видео под музыку или чистовой прогон — по нему система построит эталон для сравнения.",
      hint: state.exam.objectUrl ? "Нажмите «Дальше», чтобы считать эталон." : "Загрузите эталонное видео в большом окне.",
      button: "Дальше",
      disabled: !state.exam.objectUrl,
      uploadType: "exam",
    },
    review: {
      eyebrow: "Шаг 3 · Проверка",
      title: "Проверьте, как лёг эталон",
      description: "Просмотрите видео со скелетом. Если тело считывается верно и не прыгает, можно переходить дальше.",
      hint: "Если скелет выглядит плохо — нажмите «Пересчитать эталон» после правки границ.",
      button: "Дальше",
      disabled: !state.reference.length,
      uploadType: "exam",
    },
    markers: {
      eyebrow: "Шаг 4 · Фрагмент",
      title: "Фрагмент сдачи",
      description: "Фрагмент — это конкретный отрезок танца, который ученик будет сдавать на оценку. Можно оставить весь танец или выбрать только важную связку.",
      hint: "Ученику будет предложено повторить именно этот кусок, а сравнение пойдёт по эталону внутри выбранных границ.",
      button: "Дальше",
      disabled: !state.exam.objectUrl,
      uploadType: "exam",
    },
    publish: {
      eyebrow: "Шаг 5 · Публикация",
      title: "Урок готов к публикации",
      description: "Проверьте название, видео, эталон и фрагмент. После публикации урок появится в выбранной группе студии.",
      hint: "Публикацию можно будет доработать: добавить описание, материалы и доступы.",
      button: "Опубликовать урок",
      disabled: !(state.reference.length && clipReady(state.exam)),
      uploadType: "exam",
    },
  };
  const current = steps[activeStep] || steps.upload;
  updateTeacherUploadTarget(current.uploadType || "learning");
  if (els.teacherStepEyebrow) els.teacherStepEyebrow.textContent = current.eyebrow;
  if (els.teacherStepTitle) els.teacherStepTitle.textContent = current.title;
  if (els.teacherStepDescription) els.teacherStepDescription.textContent = current.description;
  if (els.teacherStepHint) els.teacherStepHint.textContent = current.hint;
  if (els.buildReferenceButton) els.buildReferenceButton.hidden = true;
  if (els.teacherRebuildReferenceButton) {
    els.teacherRebuildReferenceButton.hidden = activeStep !== "review" || !state.exam.objectUrl;
    els.teacherRebuildReferenceButton.disabled = state.mode === "scan";
  }
  if (els.teacherStepNextButton) {
    els.teacherStepNextButton.hidden = current.disabled && (activeStep === "upload" || activeStep === "scan");
    els.teacherStepNextButton.disabled = current.disabled;
    els.teacherStepNextButton.innerHTML = `${current.button} <span aria-hidden="true">→</span>`;
  }
}

function updateTeacherUploadTarget(type) {
  if (!els.teacherUploadLabel) return;
  const title = els.teacherUploadLabel.querySelector("strong");
  const description = els.teacherUploadLabel.querySelector("span:not(.upload-cloud)");
  const status = els.teacherUploadLabel.querySelector("small");
  const target = type === "exam" ? "examUpload" : "learningUpload";
  els.teacherUploadLabel.setAttribute("for", target);
  if (title) {
    title.textContent = type === "exam"
      ? (state.exam.objectUrl ? "Видео эталона загружено" : "Загрузите видео эталона")
      : (state.learning.objectUrl ? "Видео обучения загружено" : "Загрузите видео обучения");
  }
  if (description) {
    description.textContent = type === "exam"
      ? "Это видео система использует для считывания эталона движения. Начало и конец можно выставить по желанию."
      : "Это видео увидят ученики на этапе изучения. Начало и конец можно выставить по желанию.";
  }
  if (status) {
    status.textContent = type === "exam" ? els.examUploadStatus.textContent : els.learningUploadStatus.textContent;
  }
}

async function advanceTeacherWizard() {
  const currentStep = els.appShell.dataset.teacherStep || "upload";
  if (currentStep === "upload") {
    if (!state.learning.objectUrl) {
      els.learningUpload.click();
      return;
    }
    const clip = state.learning;
    if (!clip.startSet) {
      clip.start = 0;
      clip.startSet = true;
    }
    if (!clip.endSet) {
      clip.end = clip.duration || teacherVideo.duration || 0;
      clip.endSet = true;
    }
    normalizeClipRange(clip);
    updateExamControls();
    updatePipeline("scan");
    await switchTeacherVideo("exam");
    return;
  }
  if (currentStep === "scan") {
    if (!state.exam.objectUrl) {
      els.examUpload.click();
      return;
    }
    const clip = state.exam;
    if (!clip.startSet) {
      clip.start = 0;
      clip.startSet = true;
    }
    if (!clip.endSet) {
      clip.end = clip.duration || teacherVideo.duration || 0;
      clip.endSet = true;
    }
    normalizeClipRange(clip);
    updateExamControls();
    updatePipeline("scan");
    await buildReferenceFromExam();
    return;
  }
  if (currentStep === "review") {
    updatePipeline("markers");
    return;
  }
  if (currentStep === "markers") {
    updatePipeline("publish");
    return;
  }
  if (currentStep === "publish") {
    publishTeacherLesson();
  }
}

function publishTeacherLesson() {
  const lesson = activeTeacherLesson();
  if (!lesson) return;
  const lessonDuration = Math.max(0, (examEnd() || 0) - (state.exam.start || 0)) || state.exam.duration || teacherVideo.duration || 0;
  lesson.published = true;
  lesson.status = "published";
  lesson.hasVideo = Boolean(state.exam.objectUrl);
  lesson.hasReference = state.reference.length > 0;
  lesson.durationSeconds = lessonDuration;
  lesson.duration = lessonDuration ? formatLessonDuration(lessonDuration) : "";
  lesson.lessonType = lesson.lessonType || "Видеоурок";
  lesson.publishedAt = new Date().toISOString();
  lesson.description = lesson.description || "Видео урок опубликован. Ученики могут учить связку и сдавать фрагмент.";
  persistTeacherWorkspace();
  renderTeacherWorkspace();
  updatePipeline("publish");
  els.scanStatus.textContent = "Урок опубликован в группе";
  els.reviewStatus.textContent = "опубликован";
  els.teacherStepNextButton.innerHTML = `Опубликовано <span aria-hidden="true">✓</span>`;
  els.teacherStepNextButton.disabled = true;
  setTeacherFolderView("group");
}

function updateLessonFlow(activeStep) {
  const order = ["practice", "exam", "publish", "result"];
  const activeIndex = Math.max(0, order.indexOf(activeStep));
  state.studentLessonStep = order[activeIndex] || "practice";

  els.lessonFlowSteps.forEach((step, index) => {
    step.classList.toggle("active", index === activeIndex);
    step.classList.toggle("completed", index < activeIndex);
  });

  els.appShell.classList.toggle("student-step-practice", state.studentLessonStep === "practice");
  els.appShell.classList.toggle("student-step-exam", state.studentLessonStep === "exam");
  els.appShell.classList.toggle("student-step-publish", state.studentLessonStep === "publish");
  els.appShell.classList.toggle("student-step-result", state.studentLessonStep === "result");

  if (els.studentRetakeStepButton) {
    els.studentRetakeStepButton.hidden = state.studentLessonStep !== "publish";
  }
  if (els.studentStepNextButton) {
    const labels = {
      practice: `Дальше <span aria-hidden="true">→</span>`,
      exam: `Начать сдачу <span aria-hidden="true">→</span>`,
      publish: `Опубликовать <span aria-hidden="true">→</span>`,
      result: `Готово <span aria-hidden="true">✓</span>`,
    };
    els.studentStepNextButton.innerHTML = labels[state.studentLessonStep] || labels.practice;
  }
}

async function advanceStudentLessonStep() {
  if (state.studentLessonStep === "practice") {
    updateLessonFlow("exam");
    els.appShell.classList.add("student-exam-mode");
    els.appShell.classList.remove("student-learning-mode", "student-result-mode", "student-publish-mode");
    els.taskStatus.textContent = "подготовьте сдачу";
    return;
  }

  if (state.studentLessonStep === "exam") {
    await toggleDance();
    return;
  }

  if (state.studentLessonStep === "publish") {
    updateLessonFlow("result");
    els.appShell.classList.add("student-result-mode");
    els.appShell.classList.remove("student-learning-mode", "student-exam-mode", "student-publish-mode");
    if (state.lastAttempt) showResultOverlay(state.lastAttempt);
    else els.taskStatus.textContent = "сначала сдайте танец";
    return;
  }

  if (state.studentLessonStep === "result") {
    publishStudentAttempt();
  }
}

function showResultOverlay(attempt) {
  const stars = Number.isFinite(attempt.stars) ? attempt.stars : matchToStars(attempt.match || 0);
  const info = levelInfoFromStars(totalStars());
  const tip = resultTipFromScores(attempt.scores);

  els.resultStars.textContent = renderStars(stars);
  els.resultTitle.textContent = stars >= 5 ? "Идеальная сдача" : stars >= 3 ? "Уровень пройден" : "Еще немного тренировки";
  els.resultDetails.textContent = resultDetailsText(attempt, stars, tip);
  els.resultLevelBadge.textContent = `★${info.current.level}`;
  els.resultLevelName.textContent = info.current.name;
  renderMistakes(attempt.scores?.mistakes || []);
  els.resultOverlay.hidden = false;
}

function resultDetailsText(attempt, stars, tip) {
  const scores = attempt.scores || {};
  const coverageText = Number.isFinite(scores.coverage) ? `кадры ${scores.coverage}%` : "кадры -";
  const parts = [
    `${attempt.match}% совпадения`,
    `${stars} из 5 звезд`,
    coverageText,
    `руки ${roundScore(scores.arms)}%`,
    `ноги ${roundScore(scores.legs)}%`,
    `корпус ${roundScore(scores.body)}%`,
    `амплитуда ${roundScore(scores.amplitude)}%`,
    `траектория ${roundScore(scores.trajectory)}%`,
    `движение ${roundScore(scores.motion)}%`,
    `3D ${roundScore(scores.world)}%`,
    `ритм ${roundScore(scores.timing)}%`,
    tip,
  ];
  return parts.join(" · ");
}

function roundScore(value) {
  return Number.isFinite(value) ? Math.round(value) : 0;
}

function retakeStudentAttempt() {
  els.resultOverlay.hidden = true;
  updateLessonFlow("exam");
  els.taskStatus.textContent = "готов к пересдаче";
  els.appShell.classList.add("student-exam-mode");
  els.appShell.classList.remove("student-result-mode", "student-learning-mode", "student-publish-mode");
}

function publishStudentAttempt() {
  els.resultOverlay.hidden = true;
  const latest = state.attempts[0];
  if (!latest) return;
  const submission = {
    ...latest,
    studentName: state.studentProfile
      ? `${state.studentProfile.firstName} ${state.studentProfile.lastName}`.trim()
      : "Ученик",
    nickname: state.studentProfile?.nickname || "@student",
    status: "passed",
    publishedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem("danceReplayStudentSubmission", JSON.stringify(submission));
  } catch (error) {
    console.warn("Не удалось сохранить сдачу ученика", error);
  }
  els.taskStatus.textContent = "сдача опубликована";
  renderTeacherStudentProgress();
}

function renderTeacherStudentProgress() {
  const list = document.querySelector(".student-progress-list");
  if (!list) return;
  let submission = null;
  try {
    submission = JSON.parse(localStorage.getItem("danceReplayStudentSubmission") || "null");
  } catch (error) {
    submission = null;
  }
  const profileName = state.studentProfile
    ? `${state.studentProfile.firstName} ${state.studentProfile.lastName}`.trim()
    : "Женя Шалаев";
  const nickname = state.studentProfile?.nickname || "@student";
  const ownRow = submission
    ? `
      <div class="student-progress-row is-current">
        <div>
          <strong>${escapeHtml(submission.studentName || profileName)}</strong>
          <small>${escapeHtml(submission.nickname || nickname)} · сдача опубликована</small>
        </div>
        <span class="lesson-status passed">Сдал</span>
        <b>${Math.round(submission.match || 0)}% · ${renderStars(submission.stars || 0)}</b>
      </div>
    `
    : `
      <div class="student-progress-row is-current">
        <div>
          <strong>${escapeHtml(profileName)}</strong>
          <small>${escapeHtml(nickname)} · урок открыт</small>
        </div>
        <span class="lesson-status viewed">Смотрит</span>
        <b>нет сдачи</b>
      </div>
    `;
  list.innerHTML = `${ownRow}
    <div class="student-progress-row">
      <div>
        <strong>Алиса Морозова</strong>
        <small>@alisa.m · посмотрела обучение</small>
      </div>
      <span class="lesson-status learning">Учит</span>
      <b>0%</b>
    </div>
    <div class="student-progress-row">
      <div>
        <strong>Марк Соколов</strong>
        <small>@markdance · сдал под музыку</small>
      </div>
      <span class="lesson-status passed">Сдал</span>
      <b>94% · ★★★★★</b>
    </div>
    <div class="student-progress-row">
      <div>
        <strong>Вера Ким</strong>
        <small>@vera.k · открыл урок, не сдавал</small>
      </div>
      <span class="lesson-status viewed">Смотрел</span>
      <b>нет сдачи</b>
    </div>`;
}

function renderMistakes(mistakes) {
  els.mistakeList.hidden = true;
  els.mistakeList.innerHTML = "";
  els.showMistakesButton.hidden = !mistakes.length;
  if (!mistakes.length) return;

  mistakes.forEach((mistake, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "mistake-item";
    item.textContent = `${index + 1}. ${formatTime(mistake.time)} · ${mistake.label} · ${mistake.score}%`;
    item.addEventListener("click", () => previewMistake(mistake));
    els.mistakeList.append(item);
  });
}

function toggleMistakes() {
  els.mistakeList.hidden = !els.mistakeList.hidden;
}

async function previewMistake(mistake) {
  els.resultOverlay.hidden = true;
  await switchTeacherVideo("exam");
  const start = clamp(mistake.time - 0.8, state.exam.start, examEnd());
  teacherVideo.playbackRate = 0.55;
  await seekTeacher(start);
  state.mode = "review";
  els.reviewStatus.textContent = `ошибка ${formatTime(mistake.time)}`;
  await teacherVideo.play();
  loop();
}

function resultTipFromScores(scores = {}) {
  const candidates = [
    ["timing", "попади в музыку точнее"],
    ["position", "дойди до формы на счёт"],
    ["trajectory", "веди движение по той же траектории"],
    ["amplitude", "добавь амплитуду"],
    ["energy", "поймай скорость движения"],
  ];
  const [key, tip] = candidates.reduce((worst, item) => ((scores[item[0]] ?? 100) < (scores[worst[0]] ?? 100) ? item : worst));
  return scores[key] < 70 ? tip : "хороший рисунок движения";
}

function updateSpeed() {
  const value = Number(els.speedRange.value);
  teacherVideo.playbackRate = value;
  els.speedValue.textContent = `${value.toFixed(2)}x`;
}

function updateSegment() {
  const duration = activeClip().duration || teacherVideo.duration || 0;
  const start = segmentStart();
  els.segmentValue.textContent = duration ? `${Math.round(start)} c` : "с начала";
}

function segmentStart() {
  const clip = activeClip();
  const duration = clip.duration || teacherVideo.duration || 0;
  const manualOffset = (Number(els.segmentRange.value) / 100) * Math.max(0, activeClipEnd() - clip.start - 8);
  return Math.min(duration, clip.start + manualOffset);
}

function segmentEnd() {
  return Math.min(activeClipEnd(), segmentStart() + 8);
}

function markExamStart() {
  if (!teacherVideo.src) return;
  const clip = activeClip();
  const currentStep = els.appShell.dataset.teacherStep || "upload";
  clip.start = Math.max(0, teacherVideo.currentTime || 0);
  clip.startSet = true;
  normalizeClipRange(clip);
  updateExamControls();
  updatePipeline(currentStep);
  els.scanStatus.textContent = `Начало: ${formatTime(clip.start)}`;
  refreshReferenceForMarkers();
}

function markExamEnd() {
  if (!teacherVideo.src) return;
  const clip = activeClip();
  const currentStep = els.appShell.dataset.teacherStep || "upload";
  clip.end = Math.max(0, teacherVideo.currentTime || 0);
  clip.endSet = true;
  normalizeClipRange(clip);
  updateExamControls();
  updatePipeline(currentStep);
  els.scanStatus.textContent = `Конец: ${formatTime(activeClipEnd())}`;
  refreshReferenceForMarkers();
}

function refreshReferenceForMarkers() {
  if (state.activeTeacherVideo !== "exam" || !state.exam.objectUrl) return;
  const currentStep = els.appShell.dataset.teacherStep || "upload";
  if (!state.reference.length && currentStep !== "review" && currentStep !== "markers" && currentStep !== "publish") return;
  state.reference = [];
  if (loadStoredReference()) {
    setUploadStatus("exam", "Эталон загружен из памяти", "ready");
    els.reviewStatus.textContent = "эталон сохранён";
    els.scanStatus.textContent = `${state.reference.length} кадров эталона из памяти`;
    updatePipeline(currentStep);
    renderTeacherPoseFrame();
  } else {
    setUploadStatus("exam", "Нажмите «Считать эталон»", "processing");
    els.reviewStatus.textContent = "эталон нужно считать";
    updatePipeline(currentStep);
  }
}

async function previewExamFromMarker() {
  if (!teacherVideo.src) return;
  state.mode = "review";
  updatePipeline("review");
  teacherVideo.playbackRate = 1;
  await seekTeacher(activeClip().start);
  await teacherVideo.play();
  loop();
}

async function reviewSkeleton() {
  if (!state.exam.objectUrl) return;
  if (!state.reference.length) {
    await buildReferenceFromExam();
  }
  if (!state.reference.length) return;
  await switchTeacherVideo("exam");
  state.mode = "review";
  updatePipeline("review");
  teacherVideo.playbackRate = 1;
  await seekTeacher(segmentStart());
  await teacherVideo.play();
  els.reviewStatus.textContent = "проверка скелета";
  loop();
}

function switchView(view) {
  els.settingsViewButtons.forEach((button) => button.classList.toggle("active", button.dataset.settingsView === view));
  els.studentPanel.hidden = view !== "student";
  els.teacherPanel.hidden = view !== "teacher";
  els.appShell.classList.toggle("student-mode", view === "student");
  els.appShell.classList.toggle("teacher-mode", view === "teacher");
  setTeacherVideoNativeControls(view === "teacher");
  closeStudentPages();
  updateAccountNav("home");
  updateStageHeaderForView(view);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setAccountButtonImage(button, image) {
  if (!button) return;
  if (image) {
    button.classList.add("has-account-image");
    button.style.setProperty("--account-image", `url("${image}")`);
    return;
  }
  button.classList.remove("has-account-image");
  button.style.removeProperty("--account-image");
}

function updateAccountAvatars() {
  const profileButton = document.querySelector('[data-account-target="profile"]');
  const studioButton = document.querySelector('[data-account-target="studio"]');
  const studio = activeTeacherStudio() || {};
  setAccountButtonImage(profileButton, state.studentProfile?.avatarImage || "");
  setAccountButtonImage(studioButton, studio.image || "");
}

function syncAccountMenuPrimary(target) {
  const menu = document.querySelector(".account-menu");
  const drawer = menu?.querySelector(".account-drawer");
  const profileButton = menu?.querySelector('[data-account-target="profile"]');
  const studioButton = menu?.querySelector('[data-account-target="studio"]');
  if (!menu || !drawer || !profileButton || !studioButton) return;

  const primaryButton = target === "studio" ? studioButton : profileButton;
  const secondaryButton = target === "studio" ? profileButton : studioButton;

  primaryButton.classList.add("account-main");
  secondaryButton.classList.remove("account-main");

  if (primaryButton.parentElement !== menu) {
    menu.insertBefore(primaryButton, drawer);
  }

  if (secondaryButton.parentElement !== drawer || drawer.firstElementChild !== secondaryButton) {
    drawer.insertBefore(secondaryButton, drawer.firstElementChild);
  }
}

function updateAccountNav(target) {
  syncAccountMenuPrimary(target);
  els.accountNavButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.accountTarget === target);
  });
  updateAccountAvatars();
}

function closeStudentPages() {
  els.appShell.classList.remove("dancer-profile-open", "student-studio-open");
  els.levelOverlay.hidden = true;
  els.studentStudioProfilePage.hidden = true;
}

function goStudentHome() {
  switchView("student");
  closeSettings();
  closeStudentPages();
  updateAccountNav("home");
}

function openAccountTarget(target) {
  switchView("student");
  if (target === "studio") {
    showStudentStudioProfile();
    return;
  }
  showLevelOverlay();
}

function updateStageHeaderForView(view) {
  const title = document.querySelector(".stage-grid .studio-panel:first-child .panel-head h2");
  const description = document.querySelector(".stage-grid .studio-panel:first-child .panel-description");
  if (view === "teacher") {
    els.teacherVideoModeLabel.textContent = "Мастер урока";
    if (title) title.textContent = "Следуйте шагам";
    if (description) description.textContent = "Загрузите видео, дождитесь эталона, проверьте скелет и опубликуйте урок в студии.";
    return;
  }
  els.teacherVideoModeLabel.textContent = "Урок";
  if (title) title.textContent = "Учите и сдавайте в одном окне";
  if (description) description.textContent = "Сначала посмотрите видео педагога, затем включите сдачу и опубликуйте попытку.";
}

function readStoredTheme() {
  try {
    return localStorage.getItem("danceReplayTheme") === "dark" ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

function applyTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = safeTheme === "dark" ? "dark" : "";
  els.themeToggleButton.setAttribute("aria-pressed", String(safeTheme === "dark"));
  const themeLabel = els.themeToggleButton.querySelector("strong");
  if (themeLabel) themeLabel.textContent = safeTheme === "dark" ? "Тёмная тема" : "Светлая тема";
  els.themeToggleButton.setAttribute(
    "aria-label",
    safeTheme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", safeTheme === "dark" ? "#101114" : "#f1eee7");
}

function openSettings() {
  updateSettingsEditAction();
  els.settingsOverlay.hidden = false;
}

function closeSettings() {
  els.settingsOverlay.hidden = true;
}

function updateSettingsEditAction() {
  const label = els.editDancerProfileButton?.querySelector("strong");
  if (!label) return;
  const isTeacher = els.appShell.classList.contains("teacher-mode");
  label.textContent = isTeacher ? "Редактировать кабинет студии" : "Редактировать кабинет танцора";
}

function openCurrentCabinetEditor() {
  if (els.appShell.classList.contains("teacher-mode")) {
    if (!activeTeacherStudio()) {
      openTeacherCreateDialog("studio");
      return;
    }
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeSubgroupIds = [];
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("studio");
    openTeacherEditDialog();
    return;
  }

  openStudentEditDialog();
}

function openStudentEditDialog() {
  if (!state.studentProfile) {
    switchView("student");
    return;
  }
  els.studentEditFirstName.value = state.studentProfile.firstName || "";
  els.studentEditLastName.value = state.studentProfile.lastName || "";
  els.studentEditNickname.value = state.studentProfile.nickname || "";
  els.studentEditAge.value = profileBirthDate(state.studentProfile);
  renderDanceStyleOptions(els.studentEditStyleOptions, state.studentProfile.styles || []);
  els.studentEditOverlay.hidden = false;
  window.requestAnimationFrame(() => els.studentEditFirstName.focus());
}

function closeStudentEditDialog() {
  els.studentEditOverlay.hidden = true;
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("danceReplayTheme", nextTheme);
  } catch (error) {
    console.warn("Не удалось сохранить тему", error);
  }
}

function focusDanceStage() {
  switchView("student");
  updateLessonFlow("practice");
  document.querySelector(".stage-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setTeacherFolderView(view) {
  if (view === "root" && state.teacherWorkspace.studios.length) view = "studio";
  renderTeacherWorkspace();
  const studio = activeTeacherStudio();
  const group = activeTeacherGroup();
  const subgroups = activeTeacherSubgroupPath();
  const lesson = activeTeacherLesson();
  const meta = teacherFolderMeta(studio, group, subgroups, lesson);
  const safeView = meta[view] ? view : "root";
  state.teacherFolderView = safeView;
  els.teacherFolderViews.forEach((panel) => {
    const active = panel.dataset.teacherView === safeView;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  els.teacherBreadcrumb.textContent = meta[safeView].breadcrumb;
  els.teacherBreadcrumb.innerHTML = renderTeacherBreadcrumb(safeView, studio, group, subgroups, lesson);
  els.teacherFolderTitle.textContent = meta[safeView].title;
  const actionLabel = meta[safeView].action;
  els.teacherPrimaryAction.lastChild.textContent = ` ${actionLabel}`;
  els.teacherPrimaryAction.title = actionLabel;
  els.teacherPrimaryAction.hidden = safeView === "lesson";
  els.teacherBackButton.hidden = safeView === "root" || safeView === "studio";
  els.teacherEditAction.hidden = !["studio", "group", "lesson"].includes(safeView);
  els.teacherEditAction.textContent = safeView === "studio" ? "Настройки" : "Редактировать";
  els.teacherSubgroupAction.hidden = safeView !== "group" || subgroups.length >= 3;
  if (lesson && els.teacherLessonOpenTitle) els.teacherLessonOpenTitle.textContent = lesson.name;
  els.appShell.classList.toggle("teacher-lesson-open", safeView === "lesson");
  updateTeacherStudioHeaderState();
}

function renderTeacherBreadcrumb(view, studio, group, subgroups, lesson) {
  const parts = [];
  if (studio && ["studio", "group", "lesson"].includes(view)) parts.push({ label: studio.name, view: "studio" });
  if (studio && view === "studio" && state.teacherStudioLibraryTab === "students") {
    parts.push({ label: "Ученики", view: "studio" });
    if (state.teacherStudentGroupId) parts.push({ label: teacherStudentFolderTitle(studio, state.teacherStudentGroupId), view: "studio" });
  }
  if (!studio) parts.push({ label: "Создание студии", view: "root" });
  if (group && ["group", "lesson"].includes(view)) parts.push({ label: group.name, view: "group" });
  subgroups.forEach((subgroup, index) => {
    if (["group", "lesson"].includes(view)) {
      parts.push({ label: subgroup.name, view: "group", subgroupDepth: index + 1 });
    }
  });
  if (lesson && view === "lesson") parts.push({ label: lesson.name, view: "lesson" });
  return parts
    .map((part, index) => {
      const active = index === parts.length - 1;
      const label = escapeHtml(part.label);
      return active
        ? `<span>${label}</span>`
        : `<button type="button" data-breadcrumb-view="${part.view}" data-subgroup-depth="${part.subgroupDepth || 0}">${label}</button>`;
    })
    .join("<span aria-hidden=\"true\">/</span>");
}

function updateTeacherStudioHeaderState() {
  if (state.teacherFolderView !== "studio") return;
  const studio = activeTeacherStudio();
  if (!studio) return;
  const meta = teacherFolderMeta(studio, activeTeacherGroup(), activeTeacherSubgroupPath(), activeTeacherLesson());
  els.teacherBreadcrumb.innerHTML = renderTeacherBreadcrumb("studio", studio, null, [], null);
  els.teacherFolderTitle.textContent = state.teacherStudioLibraryTab === "students"
    ? teacherStudentFolderTitle(studio, state.teacherStudentGroupId)
    : meta.studio.title;
  els.teacherPrimaryAction.lastChild.textContent = state.teacherStudioLibraryTab === "students" ? " Пригласить" : ` ${meta.studio.action}`;
  els.teacherPrimaryAction.title = state.teacherStudioLibraryTab === "students" ? "Пригласить ученика" : meta.studio.action;
  els.teacherEditAction.textContent = "Настройки";
  updateTeacherSpaceHeading(studio);
}

function teacherStudentFolderTitle(studio, folderId) {
  if (!folderId) return "Ученики";
  if (folderId === "__hall") return "Холл";
  if (folderId === "__ungrouped") return "Без группы";
  return teacherStudioGroupOptions(studio).find((group) => group.id === folderId)?.label || "Ученики";
}

function updateTeacherSpaceHeading(studio) {
  if (!els.teacherSpaceEyebrow || !els.teacherSpaceTitle) return;
  if (state.teacherStudioLibraryTab === "students") {
    const count = Array.isArray(studio?.students) ? studio.students.length : 0;
    els.teacherSpaceEyebrow.textContent = "Ученики студии";
    els.teacherSpaceTitle.textContent = `${studio?.name || "Студия"} · ${count} ${pluralizeStudents(count)}`;
    return;
  }
  els.teacherSpaceEyebrow.textContent = "Пространства";
  els.teacherSpaceTitle.textContent = "Материалы студии";
}

function goTeacherBack() {
  if (state.teacherFolderView === "group" && state.teacherWorkspace.activeSubgroupIds.length) {
    state.teacherWorkspace.activeSubgroupIds.pop();
    setTeacherFolderView("group");
    return;
  }
  const previousView = {
    group: "studio",
    lesson: "group",
  }[state.teacherFolderView];
  if (previousView) setTeacherFolderView(previousView);
}

function teacherFolderMeta(studio, group, subgroups, lesson) {
  const studioName = studio?.name || "Студия";
  const currentSubgroup = subgroups.length ? subgroups[subgroups.length - 1] : null;
  const groupName = currentSubgroup?.name || group?.name || "Группа";
  const lessonName = lesson?.name || "Урок";
  return {
    root: {
      breadcrumb: "Новая студия",
      title: "Кабинет педагога",
      action: "Создать студию",
    },
    studio: {
      breadcrumb: studioName,
      title: studioName,
      action: "Создать группу",
    },
    group: {
      breadcrumb: `${studioName} / ${groupName}`,
      title: groupName,
      action: "Создать урок",
    },
    lesson: {
      breadcrumb: `${studioName} / ${groupName} / ${lessonName}`,
      title: lessonName,
      action: "Опубликовать",
    },
  };
}

function renderTeacherWorkspace() {
  const { studios } = state.teacherWorkspace;
  els.teacherRootEmpty.hidden = studios.length > 0;
  els.teacherStudioList.innerHTML = studios.map((studio) => folderButton("studio", studio)).join("");
  const studio = activeTeacherStudio();
  renderStudioChannel(studio);
  renderTeacherStudents(studio);
  renderStudioLibraryTab();
  els.teacherGroupList.innerHTML = studio?.groups?.length
    ? studio.groups.map((group) => folderButton("group", group)).join("")
    : emptyFolderText("В этой студии пока нет групп", "Нажмите плюс сверху, чтобы создать группу.", "group");
  const group = activeTeacherGroup();
  const container = activeTeacherContainer();
  const groupItems = [
    ...(container?.subgroups || []).map((subgroup) => folderButton("subgroup", subgroup)),
    ...(container?.lessons || []).map((lesson) => folderButton("lesson", lesson)),
  ];
  els.teacherLessonList.innerHTML = groupItems.length
    ? groupItems.join("")
    : emptyFolderText("В этой группе пока нет уроков", "Нажмите плюс сверху, чтобы создать урок.", "lesson");
}

function renderStudioChannel(studio) {
  els.teacherStudioChannel.hidden = !studio;
  if (!studio) return;
  studio.students = Array.isArray(studio.students) ? studio.students : [];
  els.teacherStudioChannelName.textContent = studio.name || "Студия";
  els.teacherStudioChannelDescription.textContent = studio.description || "Добавьте описание студии в настройках.";
  els.teacherStudioChannelAddress.textContent = studio.address || studio.city || "Не указан";
  els.teacherStudioDirections.textContent = studio.directions || "Пока не указаны";
  if (els.teacherStudioLogoLetter) {
    els.teacherStudioLogoLetter.textContent = studio.image ? "" : (studio.name || "С").slice(0, 1).toUpperCase();
  }
  els.teacherStudioLogo.style.backgroundImage = studio.image ? `url("${studio.image}")` : "";
  els.teacherStudioCoverImage.hidden = !studio.cover;
  if (studio.cover) els.teacherStudioCoverImage.src = studio.cover;
  else els.teacherStudioCoverImage.removeAttribute("src");
  const link = normalizeExternalLink(studio.contact);
  els.teacherStudioChannelLink.hidden = !link;
  if (link) {
    els.teacherStudioChannelLink.href = link;
    els.teacherStudioChannelLink.textContent = link.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
  renderStudioAchievements(studio);
}

async function updateTeacherStudioInlineImage(event, field) {
  const file = event.target.files?.[0];
  if (!file) return;
  const studio = activeTeacherStudio();
  if (!studio) return;

  const imageData = field === "cover"
    ? await optimizeCoverImage(file)
    : await optimizeAvatarImage(file);
  if (!imageData) return;

  studio[field] = imageData;
  persistTeacherWorkspace();
  renderStudioChannel(studio);
  updateAccountAvatars();
  if (!els.studentStudioProfilePage.hidden) {
    renderStudentStudioProfile();
  }
}

function setStudioLibraryTab(tab = "lessons") {
  state.teacherStudioLibraryTab = tab === "students" ? "students" : "lessons";
  if (state.teacherStudioLibraryTab !== "students") state.teacherStudentGroupId = "";
  renderStudioLibraryTab();
  updateTeacherStudioHeaderState();
}

function renderStudioLibraryTab() {
  els.studioLibraryTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.studioLibraryTab === state.teacherStudioLibraryTab);
  });
  els.studioLibraryPanels.forEach((panel) => {
    const isActive = panel.dataset.studioLibraryPanel === state.teacherStudioLibraryTab;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function renderTeacherStudents(studio) {
  if (!els.teacherStudentList) return;
  if (!studio) {
    els.teacherStudentList.innerHTML = "";
    return;
  }
  studio.students = Array.isArray(studio.students) ? studio.students : [];
  if (!studio.students.length) {
    els.teacherStudentList.innerHTML = emptyFolderText("В студии пока нет учеников", "Нажмите «Пригласить», чтобы добавить ученика и выдать ссылку.", "student");
    return;
  }
  const groups = teacherStudioGroupOptions(studio);
  const activeGroupId = state.teacherStudentGroupId;
  const waitingStudents = studio.students.filter(isWaitingRegistrationStudent);
  const activeStudents = studio.students.filter((student) => !isWaitingRegistrationStudent(student));

  if (!activeGroupId) {
    const groupCards = [
      ...groups.map((group) => {
        const count = activeStudents.filter((student) => student.groupId === group.id).length;
        return studentGroupFolderCard(group.id, group.label, count);
      }),
      studentGroupFolderCard("__hall", "Холл", waitingStudents.length, `${waitingStudents.length} ждёт регистрации`, "⌛"),
      studentGroupFolderCard("__ungrouped", "Без группы", activeStudents.filter((student) => !student.groupId).length),
    ];
    els.teacherStudentList.innerHTML = groupCards.join("");
    return;
  }

  const isHall = activeGroupId === "__hall";
  const normalizedGroupId = activeGroupId === "__ungrouped" || isHall ? "" : activeGroupId;
  const activeGroup = groups.find((group) => group.id === normalizedGroupId);
  const students = isHall
    ? waitingStudents
    : activeStudents.filter((student) => (student.groupId || "") === normalizedGroupId);
  const title = isHall ? "Холл" : (activeGroup?.label || "Без группы");
  els.teacherStudentList.innerHTML = `
    <button class="folder-card students-back-card" type="button" data-students-back="1">
      <span class="folder-icon" aria-hidden="true"><b>←</b></span>
      <span class="folder-card-body">
        <strong>${escapeHtml(title)}</strong>
        <small class="folder-card-note">Назад к группам учеников</small>
        <small class="folder-card-type">${students.length} ${pluralizeStudents(students.length)}</small>
      </span>
    </button>
    ${students.length ? students.map((student) => {
    const name = `${student.firstName || ""} ${student.lastName || ""}`.trim() || "Новый ученик";
    const targetGroupId = student.requestedGroupId || student.groupId || "";
    const group = groups.find((item) => item.id === targetGroupId);
    const note = [
      isWaitingRegistrationStudent(student) ? `будущая группа: ${group?.label || "—"}` : (group?.label || "Без группы"),
      student.contact || "",
      studentStatusLabel(student),
    ].filter(Boolean).join(" · ");
    return `
      <button class="folder-card student-folder-card" type="button" data-student-id="${escapeHtml(student.id)}">
        <span class="folder-icon" aria-hidden="true"><b>${escapeHtml((student.firstName || name || "У").slice(0, 1).toUpperCase())}</b></span>
        <span class="folder-card-body">
          <strong>${escapeHtml(name)}</strong>
          <small class="folder-card-note">${escapeHtml(note)}</small>
          <small class="folder-card-type">Ученик</small>
        </span>
      </button>
    `;
    }).join("") : emptyFolderText(isHall ? "Холл пуст" : "В этой группе пока нет учеников", isHall ? "Приглашённые ученики появятся здесь до регистрации." : "Пригласите ученика и назначьте его в эту группу.", "student")}
  `;
}

function isWaitingRegistrationStudent(student) {
  return student?.status === "pending_registration" || student?.status === "invited";
}

function studentStatusLabel(student) {
  if (isWaitingRegistrationStudent(student)) return "ждёт регистрации";
  return "активен";
}

function studentGroupFolderCard(id, label, count, note = "", icon = "👥") {
  return `
    <button class="folder-card student-group-folder-card" type="button" data-student-group-id="${escapeHtml(id)}">
      <span class="folder-icon" aria-hidden="true"><b>${escapeHtml(icon)}</b></span>
      <span class="folder-card-body">
        <strong>${escapeHtml(label)}</strong>
        <small class="folder-card-note">${escapeHtml(note || `${count} ${pluralizeStudents(count)}`)}</small>
        <small class="folder-card-type">Группа учеников</small>
      </span>
    </button>
  `;
}

function pluralizeStudents(count) {
  const value = Math.abs(Number(count) || 0);
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return "ученик";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "ученика";
  return "учеников";
}

function renderStudioAchievements(studio) {
  renderAchievementsInto(els.teacherStudioAchievementsList, studio?.achievements);
}

function renderAchievementsInto(container, achievementsSource) {
  if (!container) return;
  const achievements = normalizeStudioAchievements(achievementsSource);
  if (container.classList.contains("award-shelf")) {
    renderAwardShelfInto(container, achievements);
    return;
  }
  container.innerHTML = achievements.map((achievement) => {
    const title = escapeHtml(achievement.title || "Достижение");
    const note = escapeHtml(achievement.note || "Нажмите настройки, чтобы добавить описание.");
    const tooltip = `${achievement.title || "Достижение"}${achievement.note ? ` — ${achievement.note}` : ""}`;
    const icon = achievement.image
      ? `<img src="${escapeHtml(achievement.image)}" alt="" />`
      : `<span aria-hidden="true">${escapeHtml(achievement.icon || "★")}</span>`;
    return `
      <article class="achievement-medal" title="${escapeHtml(tooltip)}">
        <b>${icon}</b>
        <div>
          <strong>${title}</strong>
          <small>${note}</small>
        </div>
      </article>
    `;
  }).join("");
}

function renderAwardShelfInto(container, achievements) {
  const pinned = achievements.slice(0, 3);
  const liveAwards = achievements.slice(3, 8);
  const archive = achievements.slice(8);
  const fill = (items, size, archiveSlot = false) => {
    const cells = [];
    for (let index = 0; index < size; index += 1) {
      const award = items[index];
      if (archiveSlot && index === size - 1) {
        cells.push(awardArchiveButton(archive));
      } else if (award) {
        cells.push(awardShelfItem(award));
      } else {
        cells.push(`<span class="award-shelf-empty" aria-hidden="true"></span>`);
      }
    }
    return cells.join("");
  };
  container.innerHTML = `
    <div class="award-shelf-row pinned" aria-label="Закреплённые крупные награды">
      ${fill(pinned, 3)}
    </div>
    <div class="award-shelf-row" aria-label="Актуальные награды">
      ${fill(liveAwards.slice(0, 3), 3)}
    </div>
    <div class="award-shelf-row" aria-label="Актуальные награды и архив">
      ${fill(liveAwards.slice(3, 5), 3, true)}
    </div>
  `;
}

function awardShelfItem(award) {
  const title = escapeHtml(award.title || "Награда");
  const note = escapeHtml(award.note || "Студийная награда");
  const image = award.image
    ? `<img src="${escapeHtml(award.image)}" alt="" />`
    : `<span aria-hidden="true">${escapeHtml(award.icon || "🏆")}</span>`;
  return `
    <article class="award-object" title="${title}${note ? ` — ${note}` : ""}">
      <b>${image}</b>
      <small>${title}</small>
    </article>
  `;
}

function awardArchiveButton(archive) {
  const items = archive.length ? archive : [];
  return `
    <div class="award-archive">
      <button class="award-archive-button" type="button" aria-label="Архив наград">•••</button>
      <div class="award-archive-popover">
        <p class="eyebrow">Архив</p>
        <h4>Награды в запасе</h4>
        ${items.length ? `
          <div class="award-archive-list">
            ${items.map((award) => `
              <div>
                <strong>${escapeHtml(award.title || "Награда")}</strong>
                <small>${escapeHtml(award.note || "Можно закрепить на верхней полке через настройки.")}</small>
              </div>
            `).join("")}
          </div>
        ` : `<small class="award-archive-empty">Пока архив пуст. Новые награды будут сдвигать старые сюда.</small>`}
        <small class="award-archive-hint">Закрепление верхней полки — через настройки студии.</small>
      </div>
    </div>
  `;
}

function normalizeStudioAchievements(achievements) {
  if (!Array.isArray(achievements) || !achievements.length) return DEFAULT_STUDIO_ACHIEVEMENTS;
  return achievements
    .map((achievement) => ({
      icon: achievement.icon || "★",
      title: achievement.title || "Достижение",
      note: achievement.note || "",
      image: achievement.image || "",
    }))
    .filter((achievement) => achievement.title || achievement.note || achievement.image)
    .slice(0, 8);
}

function achievementsToText(achievements) {
  return normalizeStudioAchievements(achievements)
    .map((achievement) => `${achievement.icon || "★"} | ${achievement.title || ""} | ${achievement.note || ""}`.trim())
    .join("\n");
}

function syncAchievementTextarea() {
  if (els.teacherEditAchievements) {
    els.teacherEditAchievements.value = achievementsToText(state.teacherEditAchievementsList);
  }
}

function renderAchievementEditor() {
  if (!els.teacherAchievementItems) return;
  const achievements = state.teacherEditAchievementsList.length
    ? state.teacherEditAchievementsList
    : [];
  els.teacherAchievementItems.innerHTML = achievements.map((achievement, index) => {
    const icon = achievement.image
      ? `<img src="${escapeHtml(achievement.image)}" alt="" />`
      : `<span aria-hidden="true">${escapeHtml(achievement.icon || "★")}</span>`;
    return `
      <article class="achievement-edit-chip">
        <b>${icon}</b>
        <div>
          <strong>${escapeHtml(achievement.title || "Достижение")}</strong>
          <small>${escapeHtml(achievement.note || "Без описания")}</small>
        </div>
        <button type="button" data-remove-achievement="${index}" aria-label="Удалить достижение">×</button>
      </article>
    `;
  }).join("");
  syncAchievementTextarea();
}

function toggleAchievementForm() {
  if (!els.teacherAchievementForm) return;
  els.teacherAchievementForm.hidden = !els.teacherAchievementForm.hidden;
  if (!els.teacherAchievementForm.hidden) {
    window.requestAnimationFrame(() => els.teacherAchievementTitle?.focus());
  }
}

async function addTeacherAchievementFromForm() {
  const title = els.teacherAchievementTitle?.value.trim() || "";
  const note = els.teacherAchievementNote?.value.trim() || "";
  if (!title && !note) return;
  const image = await readFileAsDataUrl(els.teacherEditAchievementImage?.files?.[0]);
  state.teacherEditAchievementsList.push({
    icon: els.teacherAchievementIcon?.value || "🏆",
    title: title || "Достижение",
    note,
    image,
  });
  state.teacherEditAchievementsList = state.teacherEditAchievementsList.slice(0, 12);
  clearAchievementForm();
  renderAchievementEditor();
}

function removeTeacherAchievement(index) {
  if (!Number.isInteger(index)) return;
  state.teacherEditAchievementsList.splice(index, 1);
  renderAchievementEditor();
}

function clearAchievementForm() {
  if (els.teacherAchievementIcon) els.teacherAchievementIcon.value = "🏆";
  if (els.teacherAchievementTitle) els.teacherAchievementTitle.value = "";
  if (els.teacherAchievementNote) els.teacherAchievementNote.value = "";
  if (els.teacherEditAchievementImage) els.teacherEditAchievementImage.value = "";
  if (els.teacherAchievementForm) els.teacherAchievementForm.hidden = true;
}

function parseAchievementsText(value, firstImage = "") {
  const parsed = String(value || "")
    .split(/\n+/)
    .map((line, index) => {
      const parts = line.split("|").map((part) => part.trim()).filter(Boolean);
      if (!parts.length) return null;
      const icon = parts.length > 2 ? parts[0] : "★";
      const title = parts.length > 2 ? parts[1] : parts[0];
      const note = parts.length > 2 ? parts.slice(2).join(" · ") : (parts[1] || "");
      return {
        icon,
        title,
        note,
        image: index === 0 ? firstImage : "",
      };
    })
    .filter(Boolean)
    .slice(0, 8);
  return parsed.length ? parsed : DEFAULT_STUDIO_ACHIEVEMENTS;
}

function folderButton(type, item) {
  if (type === "lesson") return lessonFolderCard(item);
  const typeLabel = item.category || {
    studio: "Студия",
    group: "Группа",
    subgroup: "Подгруппа / партия",
    lesson: "Урок",
  }[type];
  const number = ["group", "subgroup"].includes(type) ? String(item.name || "").match(/\d+/)?.[0] : "";
  const groupMark = ["group", "subgroup"].includes(type) ? (number || item.name || "") : "";
  const icon = item.image
    ? `<img src="${escapeHtml(item.image)}" alt="" />`
    : groupMark
      ? `<b aria-hidden="true">${escapeHtml(groupMark)}</b>`
      : `<span aria-hidden="true">${type === "lesson" ? (item.published ? "▶" : "□") : type === "subgroup" ? "◌" : "▣"}</span>`;
  const dataset = type === "studio" ? "studio" : type === "group" ? "group" : type === "lesson" ? "lesson" : "subgroup";
  const note = itemSummary(type, item);
  const status = type === "lesson" && item.published ? `<em class="folder-card-status">Опубликован</em>` : "";
  const removable = ["group", "subgroup"].includes(type)
    ? deleteFolderControl(type, item)
    : "";
  return `
    <button class="folder-card folder-card-${type}${item.published ? " is-published" : ""}" type="button" data-${dataset}-id="${escapeHtml(item.id)}">
      ${removable}
      <span class="folder-icon">${icon}</span>
      <span class="folder-card-copy">
        <small class="folder-card-type">${escapeHtml(typeLabel)}</small>
        <strong>${escapeHtml(item.name)}</strong>
        <span class="folder-card-note">${escapeHtml(note)}</span>
        ${status}
      </span>
      <span class="folder-card-arrow" aria-hidden="true">›</span>
    </button>
  `;
}

function lessonFolderCard(item) {
  const note = itemSummary("lesson", item);
  const image = item.image || "./assets/dance-lesson-thumb.png";
  const meta = lessonDurationLabel(item);
  const typeLabel = item.lessonType || item.category || "Видеоурок";
  const statusLabel = item.published ? "опубликован" : "новое";
  return `
    <button class="folder-card folder-card-lesson lesson-showcase-card${item.published ? " is-published" : ""}" type="button" data-lesson-id="${escapeHtml(item.id)}">
      ${deleteFolderControl("lesson", item)}
      <span class="lesson-showcase-preview">
        <img src="${escapeHtml(image)}" alt="" />
        <span class="lesson-showcase-play" aria-hidden="true">▶</span>
        <small>${escapeHtml(statusLabel)}</small>
      </span>
      <span class="lesson-showcase-copy">
        <small class="folder-card-type">${escapeHtml(typeLabel)} · ${escapeHtml(meta)}</small>
        <strong>${escapeHtml(item.name || "Урок")}</strong>
        <span class="folder-card-note">${escapeHtml(note)}</span>
      </span>
      <span class="lesson-showcase-cta">Открыть урок <b aria-hidden="true">→</b></span>
    </button>
  `;
}

function deleteFolderControl(type, item = {}) {
  return `
    <span class="folder-delete" role="button" tabindex="0" data-delete-folder-type="${escapeHtml(type)}" data-delete-folder-id="${escapeHtml(item.id || "")}" aria-label="Удалить">
      ×
    </span>
  `;
}

function lessonDurationLabel(item = {}) {
  if (typeof item.duration === "string" && item.duration.trim()) return item.duration.trim();
  const currentLessonMatches = item.id && item.id === state.teacherWorkspace.activeLessonId;
  const currentClipDuration = currentLessonMatches
    ? Math.max(0, (examEnd() || 0) - (state.exam.start || 0))
    : 0;
  const seconds = Number(
    item.durationSeconds ||
    item.videoDuration ||
    item.duration ||
    currentClipDuration ||
    (currentLessonMatches ? state.exam.duration : 0)
  );
  if (!Number.isFinite(seconds) || seconds <= 0) return item.hasVideo || item.published ? "видео готово" : "без видео";
  return formatLessonDuration(seconds);
}

function formatLessonDuration(seconds) {
  const rounded = Math.max(1, Math.round(Number(seconds) || 0));
  const minutes = Math.floor(rounded / 60);
  const rest = rounded % 60;
  if (minutes <= 0) return `${rounded} сек`;
  if (rest === 0) return `${minutes} мин`;
  return `${minutes}:${String(rest).padStart(2, "0")} мин`;
}

function itemSummary(type, item) {
  if (item.description) return item.description;
  if (type === "studio") return [item.city, item.contact].filter(Boolean).join(" · ") || "студия";
  if (type === "group") return [item.age, item.level].filter(Boolean).join(" · ") || "группа";
  if (type === "subgroup") return [item.age, item.level].filter(Boolean).join(" · ") || "подгруппа / партия";
  if (type === "lesson" && item.published) return "видеоурок доступен ученикам";
  return "урок";
}

function emptyFolderText(title, text, createType = "") {
  const actionAttributes = createType
    ? ` role="button" tabindex="0" data-create-type="${escapeHtml(createType)}" aria-label="${escapeHtml(title)}"`
    : "";
  return `
    <div class="teacher-empty-note"${actionAttributes}>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(text)}</small>
    </div>
  `;
}

function activeTeacherStudio() {
  return state.teacherWorkspace.studios.find((studio) => studio.id === state.teacherWorkspace.activeStudioId) || null;
}

function activeTeacherGroup() {
  const studio = activeTeacherStudio();
  return studio?.groups?.find((group) => group.id === state.teacherWorkspace.activeGroupId) || null;
}

function activeTeacherSubgroupPath() {
  const path = [];
  let cursor = activeTeacherGroup();
  for (const subgroupId of state.teacherWorkspace.activeSubgroupIds) {
    const next = cursor?.subgroups?.find((subgroup) => subgroup.id === subgroupId);
    if (!next) break;
    path.push(next);
    cursor = next;
  }
  return path;
}

function activeTeacherContainer() {
  const subgroups = activeTeacherSubgroupPath();
  return (subgroups.length ? subgroups[subgroups.length - 1] : null) || activeTeacherGroup();
}

function activeTeacherLesson() {
  const container = activeTeacherContainer();
  return container?.lessons?.find((lesson) => lesson.id === state.teacherWorkspace.activeLessonId) || null;
}

function deleteTeacherFolderItem(type, id) {
  const studio = activeTeacherStudio();
  if (!studio || !id || !["group", "subgroup", "lesson"].includes(type)) return;
  const labels = { group: "группу", subgroup: "подгруппу", lesson: "урок" };
  const itemName = findTeacherFolderItemName(studio, type, id);
  const title = itemName ? `«${itemName}»` : labels[type];
  if (!window.confirm(`Удалить ${labels[type]} ${title}?`)) return;

  let removed = false;
  if (type === "group") {
    const before = studio.groups.length;
    studio.groups = studio.groups.filter((group) => group.id !== id);
    removed = studio.groups.length !== before;
  } else {
    removed = removeFromNestedGroups(studio.groups || [], type, id);
  }
  if (!removed) return;

  if (type === "group" && state.teacherWorkspace.activeGroupId === id) {
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeSubgroupIds = [];
    state.teacherWorkspace.activeLessonId = "";
    persistTeacherWorkspace();
    setTeacherFolderView("studio");
    return;
  }
  state.teacherWorkspace.activeSubgroupIds = state.teacherWorkspace.activeSubgroupIds.filter((subgroupId) => subgroupId !== id);
  if (state.teacherWorkspace.activeLessonId === id) state.teacherWorkspace.activeLessonId = "";
  persistTeacherWorkspace();
  renderTeacherWorkspace();
  updateTeacherStudioHeaderState();
}

function removeFromNestedGroups(groups = [], type, id) {
  for (const group of groups) {
    if (type === "lesson" && Array.isArray(group.lessons)) {
      const before = group.lessons.length;
      group.lessons = group.lessons.filter((lesson) => lesson.id !== id);
      if (group.lessons.length !== before) return true;
    }
    if (!Array.isArray(group.subgroups)) continue;
    if (type === "subgroup") {
      const before = group.subgroups.length;
      group.subgroups = group.subgroups.filter((subgroup) => subgroup.id !== id);
      if (group.subgroups.length !== before) return true;
    }
    if (removeFromNestedGroups(group.subgroups, type, id)) return true;
  }
  return false;
}

function findTeacherFolderItemName(studio = {}, type, id) {
  const walk = (groups = []) => {
    for (const group of groups) {
      if (type === "group" && group.id === id) return group.name || "";
      if (type === "lesson") {
        const lesson = (group.lessons || []).find((item) => item.id === id);
        if (lesson) return lesson.name || "";
      }
      if (type === "subgroup") {
        const subgroup = (group.subgroups || []).find((item) => item.id === id);
        if (subgroup) return subgroup.name || "";
      }
      const nested = walk(group.subgroups || []);
      if (nested) return nested;
    }
    return "";
  };
  return walk(studio.groups || []);
}

function activeTeacherEditableItem() {
  if (state.teacherFolderView === "studio") return activeTeacherStudio();
  if (state.teacherFolderView === "group") return activeTeacherContainer();
  if (state.teacherFolderView === "lesson") return activeTeacherLesson();
  return null;
}

function openTeacherEditDialog() {
  const item = activeTeacherEditableItem();
  if (!item) return;
  const typeLabels = {
    studio: ["Редактирование студии", "Данные студии", "Возраст / направления", "Город / адрес"],
    group: ["Редактирование группы", "Данные группы", "Возраст", "Уровень / направление"],
    subgroup: ["Редактирование подгруппы", "Данные подгруппы", "Возраст / партия", "Уровень / направление"],
    lesson: ["Редактирование урока", "Данные урока", "Сложность / возраст", "Музыка / стиль"],
  };
  const editType = state.teacherFolderView === "group" && state.teacherWorkspace.activeSubgroupIds.length ? "subgroup" : state.teacherFolderView;
  const [eyebrow, title, ageLabel, placeLabel] = typeLabels[editType] || typeLabels.group;
  state.teacherEditImageData = "";
  state.teacherEditCoverData = "";
  els.teacherEditEyebrow.textContent = eyebrow;
  els.teacherEditTitle.textContent = title;
  els.teacherEditAgeLabel.textContent = ageLabel;
  els.teacherEditPlaceLabel.textContent = placeLabel;
  els.teacherEditName.value = item.name || "";
  els.teacherEditDescription.value = item.description || "";
  els.teacherEditCategoryField.hidden = editType === "studio";
  els.teacherEditCategory.value = item.category || item.lessonType || ({
    group: "Группа",
    subgroup: "Подгруппа / партия",
    lesson: "Видеоурок",
  }[editType] || "");
  els.teacherEditAge.value = item.age || item.directions || "";
  els.teacherEditPlace.value = item.address || item.city || item.level || item.music || "";
  els.teacherEditContact.value = item.contact || "";
  els.teacherEditImage.value = "";
  els.teacherEditImageLabel.textContent = editType === "studio" ? "Логотип студии" : "Картинка / иконка";
  els.teacherEditCoverField.hidden = editType !== "studio";
  els.teacherEditCover.value = "";
  if (els.teacherStudioAchievementsField) {
    els.teacherStudioAchievementsField.hidden = editType !== "studio";
  }
  state.teacherEditAchievementsList = editType === "studio"
    ? normalizeStudioAchievements(item.achievements).map((achievement) => ({ ...achievement }))
    : [];
  if (els.teacherEditAchievements) {
    els.teacherEditAchievements.value = editType === "studio" ? achievementsToText(state.teacherEditAchievementsList) : "";
  }
  clearAchievementForm();
  renderAchievementEditor();
  els.teacherEditOverlay.hidden = false;
  window.requestAnimationFrame(() => els.teacherEditName.focus());
}

function closeTeacherEditDialog() {
  els.teacherEditOverlay.hidden = true;
  state.teacherEditImageData = "";
  state.teacherEditCoverData = "";
  state.teacherEditAchievementsList = [];
  clearAchievementForm();
}

function openTeacherInviteDialog() {
  const studio = activeTeacherStudio();
  if (!studio) return;
  studio.students = Array.isArray(studio.students) ? studio.students : [];
  renderInviteGroupOptions(studio);
  els.teacherInviteFirstName.value = "";
  els.teacherInviteLastName.value = "";
  els.teacherInviteContact.value = "";
  els.teacherInviteNote.value = "";
  els.teacherInviteResult.hidden = true;
  els.teacherInviteLink.textContent = "—";
  els.teacherInviteOverlay.hidden = false;
  window.requestAnimationFrame(() => els.teacherInviteFirstName.focus());
}

function closeTeacherInviteDialog() {
  els.teacherInviteOverlay.hidden = true;
}

function renderInviteGroupOptions(studio) {
  const groups = teacherStudioGroupOptions(studio);
  els.teacherInviteGroup.innerHTML = [
    `<option value="">Без группы / позже назначить</option>`,
    ...groups.map((group) => `<option value="${escapeHtml(group.id)}">${escapeHtml(group.label)}</option>`),
  ].join("");
}

function teacherStudioGroupOptions(studio) {
  const result = [];
  const walk = (items = [], prefix = "") => {
    items.forEach((group) => {
      const label = prefix ? `${prefix} / ${group.name || "Подгруппа"}` : group.name || "Группа";
      result.push({ id: group.id, label });
      walk(group.subgroups || [], label);
    });
  };
  walk(studio?.groups || []);
  return result;
}

function submitTeacherInviteDialog(event) {
  event.preventDefault();
  const studio = activeTeacherStudio();
  if (!studio) return;
  studio.students = Array.isArray(studio.students) ? studio.students : [];
  const id = `student-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const firstName = els.teacherInviteFirstName.value.trim();
  const lastName = els.teacherInviteLastName.value.trim();
  const requestedGroupId = els.teacherInviteGroup.value;
  const token = btoa(`${studio.id}:${id}`).replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const inviteLink = `${window.location.origin}${window.location.pathname}?invite=${token}`;
  const student = {
    id,
    firstName,
    lastName,
    groupId: "",
    requestedGroupId,
    contact: els.teacherInviteContact.value.trim(),
    note: els.teacherInviteNote.value.trim(),
    inviteLink,
    status: "pending_registration",
    lockedFields: ["firstName", "lastName", "requestedGroupId"],
    invitedAt: new Date().toISOString(),
  };
  studio.students.unshift(student);
  persistTeacherWorkspace();
  state.teacherStudentGroupId = "__hall";
  renderTeacherStudents(studio);
  setStudioLibraryTab("students");
  els.teacherInviteResult.hidden = false;
  els.teacherInviteLink.textContent = inviteLink;
}

function openTeacherStudentProfile(studentId) {
  const studio = activeTeacherStudio();
  const student = studio?.students?.find((item) => item.id === studentId);
  if (!student || !els.teacherStudentProfileOverlay || !els.teacherStudentProfileBody) return;
  const groups = teacherStudioGroupOptions(studio);
  const targetGroupId = student.requestedGroupId || student.groupId || "";
  const targetGroup = groups.find((group) => group.id === targetGroupId);
  const firstName = student.firstName || "—";
  const lastName = student.lastName || "—";
  const fullName = `${student.firstName || ""} ${student.lastName || ""}`.trim() || "Карточка ученика";
  const initial = (student.firstName || student.lastName || "У").slice(0, 1).toUpperCase();
  const avatarImage = student.avatarImage || student.image || "";
  const avatarStyle = avatarImage ? ` style="background-image: url('${escapeHtml(avatarImage)}')"` : "";
  const avatarContent = avatarImage ? "" : escapeHtml(initial);
  const waiting = isWaitingRegistrationStudent(student);
  els.teacherStudentProfileTitle.textContent = fullName;
  els.teacherStudentProfileBody.innerHTML = `
    <div class="teacher-student-profile-hero">
      <div class="teacher-student-avatar"${avatarStyle} aria-hidden="true">${avatarContent}</div>
      <div>
        <span class="student-status-pill ${waiting ? "waiting" : "active"}">${escapeHtml(studentStatusLabel(student))}</span>
        <h3><span>${escapeHtml(firstName)}</span><span>${escapeHtml(lastName)}</span></h3>
        <p>${escapeHtml(studio?.name || "Студия")} · ${escapeHtml(targetGroup?.label || "—")}</p>
      </div>
      <strong class="student-level-mark">${escapeHtml(student.level || "Ур. 1")}</strong>
    </div>
    <div class="teacher-student-profile-grid">
      <article>
        <small>Статус</small>
        <strong>${escapeHtml(waiting ? "ждёт регистрации" : "зарегистрирован")}</strong>
      </article>
      <article>
        <small>Стили</small>
        <strong>${escapeHtml(student.styles || "—")}</strong>
      </article>
      <article>
        <small>Опыт</small>
        <strong>${escapeHtml(student.experience || "—")}</strong>
      </article>
      <article>
        <small>Другие студии</small>
        <strong>${escapeHtml(student.otherStudios || "—")}</strong>
      </article>
      <article>
        <small>Контакт</small>
        <strong>${escapeHtml(student.contact || "—")}</strong>
      </article>
      <article>
        <small>Назначенная группа</small>
        <strong>${escapeHtml(targetGroup?.label || "—")}</strong>
      </article>
    </div>
    <div class="teacher-student-lock-note">
      <strong>Данные приглашения закреплены владельцем студии.</strong>
      <span>Имя, фамилия и назначенная группа не будут редактироваться учеником после перехода по ссылке.</span>
    </div>
    ${student.note ? `<p class="teacher-student-note">${escapeHtml(student.note)}</p>` : ""}
    ${student.inviteLink ? `<div class="teacher-student-invite-link"><small>Ссылка приглашения</small><span>${escapeHtml(student.inviteLink)}</span></div>` : ""}
  `;
  els.teacherStudentProfileOverlay.hidden = false;
}

function closeTeacherStudentProfile() {
  if (els.teacherStudentProfileOverlay) els.teacherStudentProfileOverlay.hidden = true;
}

function onTeacherEditImage(event) {
  const file = event.target.files?.[0];
  if (!file) {
    state.teacherEditImageData = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.teacherEditImageData = String(reader.result || "");
  });
  reader.readAsDataURL(file);
}

async function onTeacherEditCover(event) {
  const file = event.target.files?.[0];
  if (!file) {
    state.teacherEditCoverData = "";
    return;
  }
  state.teacherEditCoverData = await optimizeCoverImage(file);
}

async function submitTeacherEditDialog(event) {
  event.preventDefault();
  const item = activeTeacherEditableItem();
  if (!item) return;
  const [imageData, coverData] = await Promise.all([
    state.teacherEditImageData ? Promise.resolve(state.teacherEditImageData) : readFileAsDataUrl(els.teacherEditImage.files?.[0]),
    state.teacherEditCoverData
      ? Promise.resolve(state.teacherEditCoverData)
      : optimizeCoverImage(els.teacherEditCover.files?.[0]),
  ]);
  item.name = els.teacherEditName.value.trim() || item.name;
  item.description = els.teacherEditDescription.value.trim();
  item.contact = els.teacherEditContact.value.trim();
  if (state.teacherFolderView !== "studio") {
    item.category = els.teacherEditCategory.value.trim();
    if (state.teacherFolderView === "lesson") item.lessonType = item.category || item.lessonType;
  }
  if (state.teacherFolderView === "studio") {
    item.directions = els.teacherEditAge.value.trim();
    item.address = els.teacherEditPlace.value.trim();
    item.achievements = state.teacherEditAchievementsList.length
      ? state.teacherEditAchievementsList.map((achievement) => ({ ...achievement }))
      : parseAchievementsText(els.teacherEditAchievements?.value);
  } else if (state.teacherFolderView === "group") {
    item.age = els.teacherEditAge.value.trim();
    item.level = els.teacherEditPlace.value.trim();
  } else {
    item.age = els.teacherEditAge.value.trim();
    item.music = els.teacherEditPlace.value.trim();
  }
  if (imageData) item.image = imageData;
  if (state.teacherFolderView === "studio" && coverData) {
    item.cover = coverData;
  }
  persistTeacherWorkspace();
  closeTeacherEditDialog();
  setTeacherFolderView(state.teacherFolderView);
}

function openTeacherCreateDialog(forcedType = "") {
  forcedType = typeof forcedType === "string" ? forcedType : "";
  if (forcedType === "subgroup" && state.teacherWorkspace.activeSubgroupIds.length >= 3) return;
  if (state.teacherFolderView === "root" && state.teacherWorkspace.studios.length) {
    const studio = state.teacherWorkspace.studios[0];
    state.teacherWorkspace.activeStudioId = studio.id;
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("studio");
    return;
  }
  const typeByView = {
    root: "studio",
    studio: "group",
    group: "lesson",
  };
  const type = forcedType || typeByView[state.teacherFolderView];
  if (!type) return;
  state.teacherCreateType = type;
  const labels = {
    studio: ["Создание студии", "Создать студию", "Название студии", "Введите название студии"],
    group: ["Создание группы", "Создать группу", "Название группы", "Введите название группы"],
    subgroup: ["Создание подгруппы", "Создать подгруппу", "Название подгруппы", "Введите название партии или подгруппы"],
    lesson: ["Создание урока", "Создать урок", "Название урока", "Введите название урока"],
  };
  const [eyebrow, title, nameLabel, placeholder] = labels[type];
  els.teacherCreateEyebrow.textContent = eyebrow;
  els.teacherCreateTitle.textContent = title;
  els.teacherCreateNameLabel.textContent = nameLabel;
  els.teacherCreateName.value = "";
  els.teacherCreateName.placeholder = placeholder;
  els.teacherCreateDescription.value = "";
  els.teacherCreateCategoryField.hidden = type === "studio";
  const defaultCategories = {
    group: "Группа",
    subgroup: "Подгруппа / партия",
    lesson: "Видеоурок",
  };
  els.teacherCreateCategory.value = defaultCategories[type] || "";
  els.teacherCreateCategory.placeholder = type === "subgroup"
    ? "Например: балет, партия, солисты"
    : type === "group"
      ? "Например: группа, команда, класс"
      : "Например: главный урок, разминка";
  els.teacherStudioCreateFields.hidden = type !== "studio";
  els.teacherCreateLogo.value = "";
  els.teacherCreateCover.value = "";
  els.teacherCreateAddress.value = "";
  els.teacherCreateDirections.value = "";
  els.teacherCreateLink.value = "";
  els.teacherCreateOverlay.hidden = false;
  window.requestAnimationFrame(() => els.teacherCreateName.focus());
}

function closeTeacherCreateDialog() {
  els.teacherCreateOverlay.hidden = true;
  state.teacherCreateType = "";
}

async function submitTeacherCreateDialog(event) {
  event.preventDefault();
  const name = els.teacherCreateName.value.trim();
  if (!name) return;
  const description = els.teacherCreateDescription.value.trim();
  const category = els.teacherCreateCategory.value.trim();
  const id = `${state.teacherCreateType}-${Date.now().toString(36)}`;
  if (state.teacherCreateType === "studio") {
    const [image, cover] = await Promise.all([
      readFileAsDataUrl(els.teacherCreateLogo.files?.[0]),
      optimizeCoverImage(els.teacherCreateCover.files?.[0]),
    ]);
    state.teacherWorkspace.studios = [{
      id,
      name,
      description,
      image,
      cover,
      city: "",
      address: els.teacherCreateAddress.value.trim(),
      directions: els.teacherCreateDirections.value.trim(),
      contact: els.teacherCreateLink.value.trim(),
      achievements: DEFAULT_STUDIO_ACHIEVEMENTS,
      students: [],
      groups: [],
    }];
    state.teacherWorkspace.activeStudioId = id;
    persistTeacherWorkspace();
    renderStudentProfile();
    closeTeacherCreateDialog();
    setTeacherFolderView("studio");
    return;
  }
  if (state.teacherCreateType === "group") {
    const studio = activeTeacherStudio();
    if (!studio) return;
    studio.groups.push({ id, name, description, category: category || "Группа", image: "", age: "", level: "", contact: "", subgroups: [], lessons: [] });
    state.teacherWorkspace.activeGroupId = id;
    persistTeacherWorkspace();
    closeTeacherCreateDialog();
    setTeacherFolderView("group");
    return;
  }
  if (state.teacherCreateType === "subgroup") {
    const container = activeTeacherContainer();
    if (!container) return;
    container.subgroups = container.subgroups || [];
    container.subgroups.push({ id, name, description, category: category || "Подгруппа / партия", image: "", age: "", level: "", contact: "", subgroups: [], lessons: [] });
    persistTeacherWorkspace();
    closeTeacherCreateDialog();
    setTeacherFolderView("group");
    return;
  }
  if (state.teacherCreateType === "lesson") {
    const container = activeTeacherContainer();
    if (!container) return;
    container.lessons = container.lessons || [];
    container.lessons.push({ id, name, description, category: category || "Видеоурок", lessonType: category || "Видеоурок", image: "", age: "", level: "", contact: "" });
    state.teacherWorkspace.activeLessonId = id;
    persistTeacherWorkspace();
    closeTeacherCreateDialog();
    setTeacherFolderView("lesson");
  }
}

function normalizeTeacherWorkspace() {
  const workspace = state.teacherWorkspace;
  workspace.studios = Array.isArray(workspace.studios) ? workspace.studios.slice(0, 1) : [];
  workspace.studios.forEach((studio) => {
    studio.students = Array.isArray(studio.students) ? studio.students : [];
  });
  workspace.activeSubgroupIds = Array.isArray(workspace.activeSubgroupIds) ? workspace.activeSubgroupIds : [];
  if (workspace.studios.length && !workspace.studios.some((studio) => studio.id === workspace.activeStudioId)) {
    workspace.activeStudioId = workspace.studios[0].id;
  }
  if (!workspace.studios.length) {
    workspace.activeStudioId = "";
    workspace.activeGroupId = "";
    workspace.activeSubgroupIds = [];
    workspace.activeLessonId = "";
  }
}

function persistTeacherWorkspace() {
  try {
    localStorage.setItem("danceReplayTeacherWorkspace", JSON.stringify(state.teacherWorkspace));
  } catch (error) {
    console.warn("Не удалось сохранить пространство студии", error);
  }
}

function renderStudentProfile() {
  if (!els.studentStyleOptions.children.length) {
    renderDanceStyleOptions(els.studentStyleOptions);
  }
  const studio = activeTeacherStudio();
  const studioName = state.studentProfile?.studioName || studio?.name || "Танцевальная студия";
  els.studentInviteStudioName.textContent = studioName;
  const hasProfile = Boolean(state.studentProfile);
  els.appShell.classList.toggle("student-onboarding", !hasProfile);
  els.studentOnboarding.hidden = hasProfile;
  els.studentAccountContent.hidden = !hasProfile;
  if (!hasProfile) return;
  els.studentStudioName.textContent = studioName;
  els.studentProfileName.textContent = `${state.studentProfile.firstName} ${state.studentProfile.lastName}`;
  const badge = els.levelCardButton?.querySelector(".profile-badge");
  if (badge) {
    badge.textContent = state.studentProfile.avatarImage ? "" : (state.studentProfile.firstName || "Т").slice(0, 1).toUpperCase();
    badge.style.backgroundImage = state.studentProfile.avatarImage ? `url("${state.studentProfile.avatarImage}")` : "";
  }
  updateAccountAvatars();
}

function renderDanceStyleOptions(container, selectedStyles = []) {
  if (!container) return;
  const selected = new Set(selectedStyles);
  container.innerHTML = DANCE_STYLES.map((style) => `
    <label class="style-check">
      <input type="checkbox" name="danceStyle" value="${escapeHtml(style)}"${selected.has(style) ? " checked" : ""} />
      <span>${escapeHtml(style)}</span>
    </label>
  `).join("");
}

function submitStudentProfile(event) {
  event.preventDefault();
  const selectedStyles = [...els.studentProfileForm.querySelectorAll('input[name="danceStyle"]:checked')]
    .map((input) => input.value);
  const studio = activeTeacherStudio();
  state.studentProfile = {
    id: `student-${Date.now().toString(36)}`,
    firstName: els.studentFirstName.value.trim(),
    lastName: els.studentLastName.value.trim(),
    nickname: els.studentNickname.value.trim().replace(/^@?/, "@"),
    birthDate: els.studentAge.value,
    age: ageFromBirthDate(els.studentAge.value),
    styles: selectedStyles,
    coverImage: "",
    avatarImage: "",
    studioId: studio?.id || "invite-studio",
    studioName: studio?.name || "Танцевальная студия",
    joinedAt: new Date().toISOString(),
  };
  persistStudentProfile();
  renderStudentProfile();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitStudentEditDialog(event) {
  event.preventDefault();
  if (!state.studentProfile) return;
  const selectedStyles = [...els.studentEditForm.querySelectorAll('input[name="danceStyle"]:checked')]
    .map((input) => input.value);
  state.studentProfile = {
    ...state.studentProfile,
    firstName: els.studentEditFirstName.value.trim(),
    lastName: els.studentEditLastName.value.trim(),
    nickname: els.studentEditNickname.value.trim().replace(/^@?/, "@"),
    birthDate: els.studentEditAge.value,
    age: ageFromBirthDate(els.studentEditAge.value),
    styles: selectedStyles,
  };
  persistStudentProfile();
  renderStudentProfile();
  renderDancerProfileDetails();
  updateAccountAvatars();
  closeStudentEditDialog();
}

function persistStudentProfile() {
  try {
    localStorage.setItem("danceReplayStudentProfile", JSON.stringify(state.studentProfile));
  } catch (error) {
    console.warn("Не удалось сохранить профиль ученика", error);
  }
}

function readStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readFileAsDataUrl(file) {
  if (!file) return Promise.resolve("");
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")), { once: true });
    reader.addEventListener("error", () => resolve(""), { once: true });
    reader.readAsDataURL(file);
  });
}

async function optimizeCoverImage(file) {
  if (!file) return "";
  const source = URL.createObjectURL(file);
  try {
    const image = await loadImageSource(source);
    const maxWidth = 1600;
    const maxHeight = 1000;
    const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return readFileAsDataUrl(file);
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.84);
  } catch (error) {
    console.warn("Не удалось оптимизировать обложку", error);
    return readFileAsDataUrl(file);
  } finally {
    URL.revokeObjectURL(source);
  }
}

async function optimizeAvatarImage(file) {
  if (!file) return "";
  const source = URL.createObjectURL(file);
  try {
    const image = await loadImageSource(source);
    const size = 640;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return readFileAsDataUrl(file);
    const minSide = Math.min(image.naturalWidth, image.naturalHeight);
    const sx = Math.max(0, (image.naturalWidth - minSide) / 2);
    const sy = Math.max(0, (image.naturalHeight - minSide) / 2);
    context.drawImage(image, sx, sy, minSide, minSide, 0, 0, size, size);
    return canvas.toDataURL("image/jpeg", 0.86);
  } catch (error) {
    console.warn("Не удалось оптимизировать аватар", error);
    return readFileAsDataUrl(file);
  } finally {
    URL.revokeObjectURL(source);
  }
}

function loadImageSource(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", reject, { once: true });
    image.src = source;
  });
}

function normalizeExternalLink(value) {
  const link = String(value || "").trim();
  if (!link) return "";
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => (
    {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char]
  ));
}

function ageFromBirthDate(value) {
  if (!value) return 0;
  const birthDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayHasNotPassed =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  if (birthdayHasNotPassed) age -= 1;
  return Math.max(age, 0);
}

function profileBirthDate(profile = {}) {
  return profile.birthDate || "";
}

function updateExamMarker() {
  const clip = activeClip();
  els.learningRangeValue.textContent = `${formatTime(state.learning.start)} → ${formatTime(clipEnd(state.learning))}`;
  els.examRangeValue.textContent = `${formatTime(state.exam.start)} → ${formatTime(examEnd())}`;
  els.examStartValue.textContent = formatTime(clip.start);
  els.examEndValue.textContent = formatTime(activeClipEnd());
  updateMarkerTicks();
}

function updateExamControls() {
  els.segmentRange.value = 0;
  updateExamMarker();
  updateSegment();
}

function updateCurrentVideoTime() {
  const current = teacherVideo.currentTime || 0;
  const duration = teacherVideo.duration || 0;
  els.currentVideoTime.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
  if (Number.isFinite(duration) && duration > 0) {
    els.teacherSeekRange.value = String(current);
    els.teacherSeekRange.style.setProperty("--progress", `${(current / duration) * 100}%`);
  }
}

async function toggleTeacherPlayback() {
  if (!teacherVideo.src) return;
  if (teacherVideo.paused) {
    try {
      await teacherVideo.play();
      loop();
    } catch (error) {
      els.scanStatus.textContent = "Браузер не смог воспроизвести это видео";
      console.error(error);
    }
  } else {
    teacherVideo.pause();
  }
}

async function toggleStudentPlayback() {
  if (!studentVideo.src) return;
  if (studentVideo.paused) {
    try {
      await studentVideo.play();
      loop();
    } catch (error) {
      els.taskStatus.textContent = "Браузер не смог воспроизвести видео ученика";
      console.error(error);
    }
  } else {
    studentVideo.pause();
  }
}

function seekStudentFromTimeline() {
  if (!studentVideo.src) return;
  studentVideo.currentTime = Number(els.studentSeekRange.value);
  updateStudentVideoTime();
}

function seekTeacherFromTimeline() {
  if (!teacherVideo.src) return;
  teacherVideo.currentTime = Number(els.teacherSeekRange.value);
  updateCurrentVideoTime();
}

function updateStudentVideoTime() {
  const current = studentVideo.currentTime || 0;
  const duration = studentVideo.duration || 0;
  els.studentVideoTime.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
  if (Number.isFinite(duration) && duration > 0) {
    els.studentSeekRange.value = String(current);
    els.studentSeekRange.style.setProperty("--progress", `${(current / duration) * 100}%`);
  }
}

function syncStudentTimeline() {
  const duration = Math.max(0, studentVideo.duration || 0);
  els.studentSeekRange.max = String(duration);
  els.studentSeekRange.value = String(studentVideo.currentTime || 0);
  updateStudentVideoTime();
  updateStudentMarkerTicks();
}

function updateStudentPlayButton() {
  els.studentPlayButton.querySelector("span").textContent = studentVideo.paused ? "▶" : "Ⅱ";
  els.studentPlayButton.title = studentVideo.paused ? "Воспроизвести видео ученика" : "Пауза";
}

function markStudentStart() {
  if (!studentVideo.src) return;
  state.studentSkeleton = [];
  state.studentClip.start = Math.max(0, studentVideo.currentTime || 0);
  state.studentClip.startSet = true;
  normalizeClipRange(state.studentClip);
  updateStudentMarkerTicks();
  els.taskStatus.textContent = `Начало ученика: ${formatTime(state.studentClip.start)}`;
}

function markStudentEnd() {
  if (!studentVideo.src) return;
  state.studentSkeleton = [];
  state.studentClip.end = Math.max(0, studentVideo.currentTime || 0);
  state.studentClip.endSet = true;
  normalizeClipRange(state.studentClip);
  updateStudentMarkerTicks();
  els.taskStatus.textContent = `Конец ученика: ${formatTime(clipEnd(state.studentClip))}`;
}

function updateStudentMarkerTicks() {
  const duration = studentVideo.duration || 0;
  const startPercent = duration > 0 ? (state.studentClip.start / duration) * 100 : 0;
  const endPercent = duration > 0 ? (clipEnd(state.studentClip) / duration) * 100 : 0;
  els.studentStartMarkerTick.style.left = `${Math.min(100, Math.max(0, startPercent))}%`;
  els.studentEndMarkerTick.style.left = `${Math.min(100, Math.max(0, endPercent))}%`;
}

function syncTeacherTimeline() {
  const duration = Math.max(0, teacherVideo.duration || 0);
  els.teacherSeekRange.max = String(duration);
  els.teacherSeekRange.value = String(teacherVideo.currentTime || 0);
  updateCurrentVideoTime();
  updateMarkerTicks();
}

function updateTeacherPlayButton() {
  els.teacherPlayButton.querySelector("span").textContent = teacherVideo.paused ? "▶" : "Ⅱ";
  els.teacherPlayButton.title = teacherVideo.paused ? "Воспроизвести" : "Пауза";
}

function updateMarkerTicks() {
  const duration = teacherVideo.duration || 0;
  const clip = activeClip();
  const startPercent = duration > 0 ? (clip.start / duration) * 100 : 0;
  const endPercent = duration > 0 ? (activeClipEnd() / duration) * 100 : 0;
  els.startMarkerTick.style.left = `${Math.min(100, Math.max(0, startPercent))}%`;
  els.endMarkerTick.style.left = `${Math.min(100, Math.max(0, endPercent))}%`;
}

function renderTeacherPoseFrame(frameTime = teacherVideo.currentTime) {
  resizeCanvasToVideo(teacherCanvas, teacherVideo);
  clearCanvas(teacherCtx, teacherCanvas);
  if (
    state.mode === "scan" ||
    !teacherVideo.src ||
    state.activeTeacherVideo === "learning" ||
    !els.teacherSkeletonToggle.checked ||
    !teacherVideo.videoWidth
  ) {
    return;
  }

  const landmarks = interpolatedReferenceLandmarks(frameTime);
  if (landmarks) {
    drawPose(teacherCtx, teacherCanvas, landmarks, "#f5c542");
    return;
  }

  if (teacherVideo.paused && state.teacherLandmarker) {
    const result = safeDetectPose(state.teacherLandmarker, teacherVideo);
    const teacher = result.landmarks?.[0];
    if (teacher) {
      drawPose(teacherCtx, teacherCanvas, teacher, "#f5c542");
    }
  }
}

function renderStudentPoseFrame() {
  if (!studentVideo.src || !state.liveLandmarker || !studentVideo.videoWidth) return;
  resizeCanvasToVideo(studentCanvas, studentVideo);
  clearCanvas(studentCtx, studentCanvas);
  const result = safeDetectPoseForVideo(state.liveLandmarker, studentVideo, performance.now());
  const student = result.landmarks?.[0];
  if (student) {
    drawPose(studentCtx, studentCanvas, student, "#2dd4bf");
  }
}

function safeDetectPose(landmarker, video) {
  try {
    if (!landmarker || !video.videoWidth || !video.videoHeight || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return { landmarks: [] };
    }
    return landmarker.detect(video);
  } catch (error) {
    console.warn("Кадр не считался", error);
    return { landmarks: [] };
  }
}

function safeDetectPoseForVideo(landmarker, video, timestamp) {
  try {
    if (!landmarker || !video.videoWidth || !video.videoHeight || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return { landmarks: [] };
    }
    return landmarker.detectForVideo(video, timestamp);
  } catch (error) {
    console.warn("Live-кадр не считался", error);
    return { landmarks: [] };
  }
}

async function buildStudentSkeleton() {
  if (!state.studentVideoObjectUrl) {
    els.taskStatus.textContent = "сначала загрузите видео ученика";
    return;
  }
  if (!state.reference.length) {
    els.taskStatus.textContent = "сначала считайте эталон педагога";
    return;
  }
  if (!state.teacherLandmarker) {
    els.taskStatus.textContent = "загружаю модель трекинга";
    const ready = await initPose();
    if (!ready || !state.teacherLandmarker) {
      els.taskStatus.textContent = "модель трекинга не загрузилась";
      return;
    }
  }

  const scanId = ++state.studentScanId;
  state.studentSkeleton = [];
  state.studentRecording = [];
  els.buildStudentSkeletonButton.disabled = true;
  els.studentPlayButton.disabled = true;
  els.markStudentStartButton.disabled = true;
  els.markStudentEndButton.disabled = true;
  studentVideo.pause();

  try {
    await waitForMetadata(studentVideo);
    state.studentClip.duration = studentVideo.duration || state.studentClip.duration || 0;
    normalizeClipRange(state.studentClip);
    const start = state.studentClip.start || 0;
    const end = Math.max(start, clipEnd(state.studentClip));
    const teacherStart = state.exam.start || 0;
    const targetFps = REFERENCE_SCAN_FPS;
    const step = 1 / targetFps;
    const totalFrames = Math.max(1, Math.ceil((end - start) / step));
    let frameIndex = 0;

    await seekStudentVideo(start);
    resizeCanvasToVideo(studentCanvas, studentVideo);
    clearCanvas(studentCtx, studentCanvas);
    els.taskStatus.textContent = "считываю скелет ученика";

    for (let rawTime = start; rawTime <= end; rawTime += step) {
      if (scanId !== state.studentScanId) return;
      await seekStudentVideo(rawTime);
      await waitForMediaReady(studentVideo);
      resizeCanvasToVideo(studentCanvas, studentVideo);
      clearCanvas(studentCtx, studentCanvas);
      const result = safeDetectPose(state.teacherLandmarker, studentVideo);
      const landmarks = result.landmarks?.[0];
      const worldLandmarks = normalizedWorldLandmarksFromResult(result);
      if (landmarks) {
        drawPose(studentCtx, studentCanvas, landmarks, "#2dd4bf");
        const normalized = normalizeLandmarks(landmarks);
        const sample = {
          time: teacherStart + (rawTime - start),
          rawTime,
          displayLandmarks: cloneLandmarks(landmarks),
          angles: poseAngles(landmarks),
          landmarks: normalized,
          worldLandmarks,
          signature: movementSignature(normalized),
        };
        state.studentSkeleton.push(sample);
      }
      frameIndex += 1;
      const progress = Math.round(((rawTime - start) / Math.max(end - start, 1)) * 100);
      els.taskStatus.textContent = `${progress}% · скелет ученика: ${state.studentSkeleton.length}/${totalFrames}`;
      updateStudentVideoTime();
      await nextFrame();
    }

    state.studentRecording = state.studentSkeleton.map((sample) => ({ ...sample }));
    await seekStudentVideo(start);
    clearCanvas(studentCtx, studentCanvas);
    const firstFrame = state.studentSkeleton[0];
    if (firstFrame?.displayLandmarks) {
      drawPose(studentCtx, studentCanvas, firstFrame.displayLandmarks, "#2dd4bf");
    }
    els.taskStatus.textContent = state.studentSkeleton.length
      ? `${state.studentSkeleton.length} кадров ученика готово. Нажмите «Сдать»`
      : "скелет ученика не найден";
  } catch (error) {
    els.taskStatus.textContent = "не удалось считать скелет ученика";
    console.error(error);
  } finally {
    if (scanId === state.studentScanId) {
      els.buildStudentSkeletonButton.disabled = false;
      els.studentPlayButton.disabled = false;
      els.markStudentStartButton.disabled = false;
      els.markStudentEndButton.disabled = false;
      updateStudentPlayButton();
      syncStudentTimeline();
    }
  }
}

function setTeacherScanning(isScanning, progress, text = "") {
  els.teacherScanOverlay.hidden = !isScanning;
  els.scanProgressValue.textContent = `${Math.min(100, Math.max(0, progress))}%`;
  els.scanOverlayText.textContent = isScanning ? text || "Считываю эталон" : "Эталон готов";
  els.teacherPlayButton.disabled = isScanning;
  els.teacherSeekRange.disabled = isScanning;
  els.markExamStartButton.disabled = isScanning;
  els.markExamEndButton.disabled = isScanning;
  els.previewExamButton.disabled = isScanning;
  els.reviewSkeletonButton.disabled = isScanning;
  teacherVideo.classList.toggle("is-hidden-layer", !els.teacherVideoToggle.checked);
  teacherCanvas.classList.toggle("is-hidden-layer", state.activeTeacherVideo === "learning" || !els.teacherSkeletonToggle.checked);
}

function updateTeacherLayerVisibility() {
  teacherVideo.classList.toggle("is-hidden-layer", !els.teacherVideoToggle.checked);
  teacherCanvas.classList.toggle("is-hidden-layer", state.activeTeacherVideo === "learning" || !els.teacherSkeletonToggle.checked);
  if (state.activeTeacherVideo === "learning" || !els.teacherSkeletonToggle.checked) {
    clearCanvas(teacherCtx, teacherCanvas);
  } else {
    renderTeacherPoseFrame();
  }
}

function examEnd() {
  return clipEnd(state.exam);
}

function activeClipEnd() {
  return clipEnd(activeClip());
}

function clipEnd(clip) {
  return clip.end || clip.duration || 0;
}

function clipReady(clip) {
  return Boolean(clip.objectUrl && clip.startSet && clip.endSet && clipEnd(clip) > clip.start);
}

function normalizeClipRange(clip) {
  const duration = Math.max(0, clip.duration || teacherVideo.duration || 0);
  clip.start = clamp(clip.start, 0, duration);
  clip.end = clamp(clip.end || duration, 0, duration);
  if (clip.end <= clip.start) {
    clip.end = Math.min(duration, clip.start + 8);
  }
  if (clip.end <= clip.start && duration > 0) {
    clip.start = Math.max(0, clip.end - 1);
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function formatTime(value) {
  const total = Math.max(0, Math.round(value || 0));
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function waitForMetadata(video) {
  return new Promise((resolve, reject) => {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      resolve();
      return;
    }

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Не удалось прочитать метаданные видео"));
    }, 8000);

    function cleanup() {
      window.clearTimeout(timeout);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("error", onError);
    }

    function onLoaded() {
      cleanup();
      resolve();
    }

    function onError() {
      cleanup();
      reject(new Error("Видео не поддерживается или повреждено"));
    }

    video.addEventListener("loadedmetadata", onLoaded, { once: true });
    video.addEventListener("error", onError, { once: true });
  });
}

function waitForMediaReady(video) {
  return new Promise((resolve) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      resolve();
      return;
    }

    const timeout = window.setTimeout(() => {
      cleanup();
      resolve();
    }, 2500);

    function cleanup() {
      window.clearTimeout(timeout);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onReady);
    }

    function onReady() {
      cleanup();
      resolve();
    }

    video.addEventListener("loadeddata", onReady, { once: true });
    video.addEventListener("canplay", onReady, { once: true });
    video.addEventListener("error", onReady, { once: true });
  });
}

function seekMedia(video, time) {
  return new Promise((resolve) => {
    const targetTime = Math.min(Math.max(0, time), Math.max(0, video.duration || 0));
    if (Math.abs(video.currentTime - targetTime) < 0.02) {
      resolve();
      return;
    }

    const timeout = window.setTimeout(() => {
      cleanup();
      resolve();
    }, 2500);

    function cleanup() {
      window.clearTimeout(timeout);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onSeeked);
    }

    function onSeeked() {
      cleanup();
      resolve();
    }

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onSeeked, { once: true });
    video.currentTime = targetTime;
  });
}

function updateMirror() {
  studentVideo.classList.toggle("mirrored", els.mirrorToggle.checked);
  studentCanvas.classList.toggle("mirrored", els.mirrorToggle.checked);
}

function renderAttempts() {
  els.attemptCount.textContent = `${state.attempts.length} попыток`;
  els.attemptList.innerHTML = "";
  state.attempts.forEach((attempt) => {
    const stars = Number.isFinite(attempt.stars) ? attempt.stars : matchToStars(attempt.match || 0);
    const item = document.createElement("li");
    item.innerHTML = `<span>${attempt.at}</span><strong>${renderStars(stars)} · ${attempt.match}%</strong>`;
    els.attemptList.append(item);
  });
  updateLevelDisplay();
}

function seekTeacher(time) {
  return new Promise((resolve) => {
    if (Math.abs(teacherVideo.currentTime - time) < 0.02) {
      resolve();
      return;
    }

    teacherVideo.addEventListener("seeked", resolve, { once: true });
    teacherVideo.currentTime = time;
  });
}

function seekStudentVideo(time) {
  return new Promise((resolve) => {
    if (!studentVideo.src || Math.abs(studentVideo.currentTime - time) < 0.02) {
      resolve();
      return;
    }

    studentVideo.addEventListener("seeked", resolve, { once: true });
    studentVideo.currentTime = time;
  });
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
