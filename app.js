const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task";
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
  learningUpload: document.querySelector("#learningUpload"),
  examUpload: document.querySelector("#examUpload"),
  learningUploadStatus: document.querySelector("#learningUploadStatus"),
  examUploadStatus: document.querySelector("#examUploadStatus"),
  learningPreviewVideo: document.querySelector("#learningPreviewVideo"),
  examPreviewVideo: document.querySelector("#examPreviewVideo"),
  showLearningVideoButton: document.querySelector("#showLearningVideoButton"),
  showExamVideoButton: document.querySelector("#showExamVideoButton"),
  startDanceCardButton: document.querySelector("#startDanceCardButton"),
  roleTabs: document.querySelectorAll(".role-tab"),
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
  levelCardButton: document.querySelector("#levelCardButton"),
  levelOverlay: document.querySelector("#levelOverlay"),
  levelOverlayDetails: document.querySelector("#levelOverlayDetails"),
  levelHistoryList: document.querySelector("#levelHistoryList"),
  levelOverlayCloseButton: document.querySelector("#levelOverlayCloseButton"),
  teacherBreadcrumb: document.querySelector("#teacherBreadcrumb"),
  teacherFolderTitle: document.querySelector("#teacherFolderTitle"),
  teacherBackButton: document.querySelector("#teacherBackButton"),
  teacherPrimaryAction: document.querySelector("#teacherPrimaryAction"),
  teacherFolderViews: document.querySelectorAll("[data-teacher-view]"),
  teacherBrowser: document.querySelector("[data-teacher-browser]"),
  teacherRootEmpty: document.querySelector("#teacherRootEmpty"),
  teacherStudioList: document.querySelector("#teacherStudioList"),
  teacherGroupList: document.querySelector("#teacherGroupList"),
  teacherLessonList: document.querySelector("#teacherLessonList"),
  teacherLessonOpenTitle: document.querySelector("#teacherLessonOpenTitle"),
  teacherCreateOverlay: document.querySelector("#teacherCreateOverlay"),
  teacherCreateForm: document.querySelector("#teacherCreateForm"),
  teacherCreateEyebrow: document.querySelector("#teacherCreateEyebrow"),
  teacherCreateTitle: document.querySelector("#teacherCreateTitle"),
  teacherCreateNameLabel: document.querySelector("#teacherCreateNameLabel"),
  teacherCreateName: document.querySelector("#teacherCreateName"),
  teacherCreateDescription: document.querySelector("#teacherCreateDescription"),
  teacherCreateCancel: document.querySelector("#teacherCreateCancel"),
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
  teacherFolderView: "root",
  teacherCreateType: "",
  teacherWorkspace: {
    studios: [],
    activeStudioId: "",
    activeGroupId: "",
    activeLessonId: "",
  },
  studentClip: {
    duration: 0,
    start: 0,
    end: 0,
    startSet: false,
    endSet: false,
  },
  lastResult: null,
  modelLoading: false,
  modelFailed: false,
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

setButtons(false);
renderAttempts();
updateLevelDisplay();
updateExamMarker();
updatePipeline("upload");
updateLessonFlow("choose");
setTeacherFolderView("root");
switchView("student");
initPose();

els.learningUpload.addEventListener("click", resetFileInputBeforePick);
els.examUpload.addEventListener("click", resetFileInputBeforePick);
els.learningUpload.addEventListener("change", (event) => onTeacherUpload(event, "learning"));
els.examUpload.addEventListener("change", (event) => onTeacherUpload(event, "exam"));
els.showLearningVideoButton.addEventListener("click", () => switchTeacherVideo("learning"));
els.showExamVideoButton.addEventListener("click", () => switchTeacherVideo("exam"));
els.startDanceCardButton.addEventListener("click", focusDanceStage);
els.roleTabs.forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.view)));
els.teacherBrowser.addEventListener("click", (event) => {
  const studioButton = event.target.closest("[data-studio-id]");
  if (studioButton) {
    state.teacherWorkspace.activeStudioId = studioButton.dataset.studioId;
    state.teacherWorkspace.activeGroupId = "";
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("studio");
    return;
  }
  const groupButton = event.target.closest("[data-group-id]");
  if (groupButton) {
    state.teacherWorkspace.activeGroupId = groupButton.dataset.groupId;
    state.teacherWorkspace.activeLessonId = "";
    setTeacherFolderView("group");
    return;
  }
  const lessonButton = event.target.closest("[data-lesson-id]");
  if (lessonButton) {
    state.teacherWorkspace.activeLessonId = lessonButton.dataset.lessonId;
    setTeacherFolderView("lesson");
  }
});
els.teacherPrimaryAction.addEventListener("click", openTeacherCreateDialog);
els.teacherBackButton.addEventListener("click", goTeacherBack);
els.teacherBreadcrumb.addEventListener("click", (event) => {
  const button = event.target.closest("[data-breadcrumb-view]");
  if (button) setTeacherFolderView(button.dataset.breadcrumbView);
});
els.teacherCreateForm.addEventListener("submit", submitTeacherCreateDialog);
els.teacherCreateCancel.addEventListener("click", closeTeacherCreateDialog);
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
els.teacherVideoToggle.addEventListener("change", updateTeacherLayerVisibility);
els.teacherSkeletonToggle.addEventListener("change", updateTeacherLayerVisibility);
els.resultCloseButton.addEventListener("click", () => {
  els.resultOverlay.hidden = true;
});
els.levelCardButton.addEventListener("click", showLevelOverlay);
els.levelOverlayCloseButton.addEventListener("click", () => {
  els.levelOverlay.hidden = true;
});
els.showMistakesButton.addEventListener("click", toggleMistakes);
els.practiceButton.addEventListener("click", startPractice);
els.danceButton.addEventListener("click", toggleDance);
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
      state.teacherLandmarker = await createPoseLandmarker(PoseLandmarker, fileset, "IMAGE");
      state.liveLandmarker = await createPoseLandmarker(PoseLandmarker, fileset, "VIDEO");

      els.modelStatus.textContent = "Модель готова";
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

async function createPoseLandmarker(PoseLandmarker, fileset, runningMode) {
  const baseOptions = {
    modelAssetPath: MODEL_URL,
    delegate: "GPU",
  };
  const options = {
    baseOptions,
    runningMode,
    numPoses: 1,
    minPoseDetectionConfidence: 0.45,
    minPosePresenceConfidence: 0.45,
    minTrackingConfidence: 0.45,
  };

  try {
    return await PoseLandmarker.createFromOptions(fileset, options);
  } catch (error) {
    console.warn(`MediaPipe ${runningMode} GPU не запустился, пробую CPU`, error);
    return PoseLandmarker.createFromOptions(fileset, {
      ...options,
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: "CPU",
      },
    });
  }
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
    showScanOverlay("Готовлю видео под музыку", 0);
    updatePipeline("scan");
  } else {
    els.scanStatus.textContent = "Загружаю обучающее видео";
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
    const restored = loadStoredReference();
    if (restored) {
      setUploadStatus("exam", "Эталон загружен из памяти", "ready");
      els.reviewStatus.textContent = "эталон сохранён";
      els.scanStatus.textContent = `${state.reference.length} кадров эталона из памяти`;
      updatePipeline("review");
      renderTeacherPoseFrame();
    } else {
      setUploadStatus("exam", "Видео готово. Нажмите «Считать эталон»", "ready");
      els.reviewStatus.textContent = "готов к считыванию";
      els.scanStatus.textContent = "Поставьте начало/конец и нажмите «Считать эталон»";
    }
  } else {
    setUploadStatus("learning", "Обучающее видео готово", "ready");
    els.scanStatus.textContent = "Обучающее видео готово";
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
  studentVideo.controls = true;
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
  if (clip.objectUrl) {
    teacherVideo.src = clip.objectUrl;
    teacherVideo.load();
    els.teacherEmpty.hidden = true;
  }
  els.teacherVideoToggle.checked = true;
  teacherVideo.classList.remove("is-hidden-layer");
  els.teacherVideoModeLabel.textContent = type === "learning" ? "Обучение" : "Под музыку";
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
  const label = input.closest(".upload-drop");
  const statusEl = type === "learning" ? els.learningUploadStatus : els.examUploadStatus;
  statusEl.textContent = text;
  label.classList.toggle("is-ready", status === "ready");
  label.classList.toggle("is-processing", status === "processing");
  label.classList.toggle("is-error", status === "error");
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
  clearCanvas(teacherCtx, teacherCanvas);

  if (clip.objectUrl && teacherVideo.src !== clip.objectUrl) {
    teacherVideo.src = clip.objectUrl;
    teacherVideo.load();
  } else if (!clip.objectUrl) {
    teacherVideo.removeAttribute("src");
    teacherVideo.load();
  }

  els.teacherEmpty.hidden = Boolean(clip.objectUrl);
  els.teacherVideoModeLabel.textContent = type === "learning" ? "Обучение" : "Под музыку";
  els.showLearningVideoButton.classList.toggle("active", type === "learning");
  els.showExamVideoButton.classList.toggle("active", type === "exam");
  els.teacherSkeletonToggle.disabled = type === "learning";
  els.reviewSkeletonButton.disabled = type === "learning";
  updateTeacherLayerVisibility();
  updateExamControls();
  syncTeacherTimeline();
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
    if (landmarks) {
      drawPose(teacherCtx, teacherCanvas, landmarks, "#f5c542");
      state.reference.push({
        time,
        displayLandmarks: cloneLandmarks(landmarks),
        landmarks: normalizeLandmarks(landmarks),
        angles: poseAngles(landmarks),
        signature: movementSignature(normalizeLandmarks(landmarks)),
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
  if (!state.learning.objectUrl) return;

  state.mode = "practice";
  els.appShell.classList.add("practice-focus");
  updateLessonFlow("practice");
  await switchTeacherVideo("learning");
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
    els.danceButton.textContent = "Сдать";
    els.taskStatus.textContent = "не начато";
    return;
  }

  const seconds = Math.max(1, Math.round((performance.now() - state.startedAt) / 1000));
  const result = evaluateRecordedAttempt();
  finalizeAttemptResult(result, seconds);
}

function finalizeAttemptResult(result, seconds) {
  const stars = Math.max(1, matchToStars(result.total));
  const attempt = {
    score: result.score,
    stars,
    match: result.total,
    scores: result,
    seconds,
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
  els.appShell.classList.remove("practice-focus");
  hideCountdown();
  teacherVideo.pause();
  if (state.studentVideoObjectUrl) {
    studentVideo.pause();
  }
  els.danceButton.textContent = "Сдать";
  updateLevelDisplay();
  updateMeters(result);
  updateLessonFlow("result");
  els.taskStatus.textContent = stars >= 3 ? "уровень пройден" : "попробовать еще";
  showResultOverlay(attempt);
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

    clearCanvas(studentCtx, studentCanvas);
    if (student) {
      drawPose(studentCtx, studentCanvas, student, "#2dd4bf");
      if (state.mode === "dance" && state.reference.length) {
        recordStudentFrame(student);
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
  return landmarks.map((point) => ({
    x: point.x,
    y: point.y,
    z: point.z || 0,
    visibility: point.visibility ?? 1,
  }));
}

function recordStudentFrame(studentLandmarks) {
  const musicTime = teacherVideo.currentTime;
  if (musicTime < state.exam.start || musicTime > state.recordingEnd) return;
  if (state.lastRecordAt >= 0 && musicTime - state.lastRecordAt < 0.08) return;

  const sample = {
    time: musicTime,
    angles: poseAngles(studentLandmarks),
    landmarks: normalizeLandmarks(studentLandmarks),
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

    const arms = jointCategoryGroupScore(reference.signature, student.signature, ["leftArm", "rightArm"]);
    const legs = jointCategoryGroupScore(reference.signature, student.signature, ["leftLeg", "rightLeg", "stance"]);
    const body = jointCategoryGroupScore(reference.signature, student.signature, ["torso", "level"]);
    const chest = body;
    const head = 70;
    const fingers = 70;
    const position = poseShapeScore(reference.signature, student.signature);
    const timing = timingScore(reference.time, student.time);
    const trajectory = trajectoryScore(referencePrevious, referenceNext, studentPrevious, studentNext);
    const amplitude = amplitudeScore(reference.signature, student.signature);
    const energy = energyScore(referencePrevious, referenceNext, studentPrevious, studentNext);
    const corrected = reconcileMicroJitterScores({ position, timing, trajectory, amplitude, energy, arms, legs, body });
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
    groups.chest.push(chest);
    groups.head.push(head);
    groups.fingers.push(fingers);
    groups.position.push(corrected.position);
    groups.timing.push(corrected.timing);
    groups.trajectory.push(corrected.trajectory);
    groups.amplitude.push(corrected.amplitude);
    groups.energy.push(corrected.energy);
    totals.push(total);
  });

  const coverage = references.length ? matchedFrames / references.length : 0;
  const rawTotal = average(totals) * coverage;
  const quality = {
    arms: average(groups.arms),
    legs: average(groups.legs),
    body: average(groups.body),
    position: average(groups.position),
    timing: average(groups.timing) * coverage,
    amplitude: average(groups.amplitude),
    trajectory: average(groups.trajectory),
    energy: average(groups.energy),
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
  if (coverage < 0.82) return Math.round(total);
  if (isTeacherLevelMatch(total, coverage, quality)) return 100;
  if (total >= 88 && coverage >= 0.98) return 100;
  if (total >= 96 && coverage >= 0.96) return 100;
  if (total >= 92 && coverage >= 0.9) return 100;
  if (total >= 90 && coverage >= 0.94) {
    return Math.min(99, Math.round(96 + (total - 90) * 0.7));
  }
  if (total >= 84 && coverage >= 0.9) {
    return Math.round(total + 5);
  }
  return Math.round(total);
}

function calibratedMetricScore(total, coverage) {
  if (coverage < 0.82) return Math.round(total);
  if (total >= 88 && coverage >= 0.9) return 100;
  return Math.round(total);
}

function isTeacherLevelMatch(total, coverage, quality) {
  const poseCore = weightedAverage(
    [quality.position || 0, quality.arms || 0, quality.legs || 0, quality.body || 0, quality.amplitude || 0],
    [0.34, 0.2, 0.18, 0.16, 0.12],
  );
  return coverage >= 0.9 && poseCore >= 82 && (quality.timing || 0) >= 82 && total >= 82;
}

function filterReportedMistakes(mistakes, total, coverage) {
  if (total >= 92 && coverage >= 0.96) return [];
  const severeThreshold = 50;
  return mistakes
    .filter((item) => item.score < severeThreshold)
    .sort((a, b) => a.score - b.score)
    .filter((item, index, list) => index === 0 || Math.abs(item.time - list[index - 1].time) > 0.8)
    .slice(0, 6);
}

function reconcileMicroJitterScores(scores) {
  const shape = weightedAverage([scores.position, scores.arms, scores.legs, scores.body, scores.amplitude], [0.34, 0.2, 0.18, 0.16, 0.12]);
  if (shape >= 72) {
    return {
      ...scores,
      trajectory: Math.max(scores.trajectory, 92),
      energy: Math.max(scores.energy, 90),
    };
  }
  if (shape >= 62 && scores.trajectory < 70) {
    return {
      ...scores,
      trajectory: Math.max(scores.trajectory, 84),
      energy: Math.max(scores.energy, 80),
    };
  }
  return scores;
}

function shouldReportMistake(scores) {
  return grossMistakeScore(scores) < 50;
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
    position: "форма позы отличается",
  };
  const [key] =
    Object.entries({
      arms: scores.arms,
      legs: scores.legs,
      body: scores.body,
      timing: scores.timing,
      amplitude: scores.amplitude,
      position: scores.position,
    }).sort((a, b) => a[1] - b[1])[0] || ["position"];
  return labels[key] || labels.position;
}

function grossMistakeScore(scores) {
  return Math.min(scores.position, scores.arms, scores.legs, scores.body, scores.timing, scores.amplitude);
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
    return numericSimilarity(reference, student, 0.06, 22);
  }
  if (reference === student) return 100;
  if (String(reference).split("_")[0] === String(student).split("_")[0]) return 92;
  return 68;
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
      ? { position: 0.54, timing: 0.24, trajectory: 0.04, amplitude: 0.12, energy: 0.06 }
      : movementType === "transition"
        ? { position: 0.44, timing: 0.2, trajectory: 0.08, amplitude: 0.18, energy: 0.1 }
        : { position: 0.58, timing: 0.22, trajectory: 0.02, amplitude: 0.14, energy: 0.04 };

  const base =
    scores.position * weights.position +
    scores.timing * weights.timing +
    scores.trajectory * weights.trajectory +
    scores.amplitude * weights.amplitude +
    scores.energy * weights.energy;
  const limbGuard = Math.min(scores.arms, scores.legs, scores.body);
  const guardedBase = limbGuard < 45 ? base * 0.78 + limbGuard * 0.22 : base * 0.94 + limbGuard * 0.06;
  return Math.round(guardedBase);
}

function trajectoryScore(referencePrevious, referenceNext, studentPrevious, studentNext) {
  const referenceVector = movementVector(referencePrevious, referenceNext);
  const studentVector = movementVector(studentPrevious, studentNext);
  if (!referenceVector && !studentVector) return 96;
  if (!referenceVector || !studentVector) return 72;
  const referenceDistance = vectorDistance(referenceVector);
  const studentDistance = vectorDistance(studentVector);
  if (referenceDistance < 0.035 && studentDistance < 0.035) return 96;
  if (referenceDistance < 0.035 || studentDistance < 0.035) return 82;
  return directionSimilarity(referenceVector, studentVector);
}

function amplitudeScore(reference, student) {
  return weightedAverage(
    [
      numericSimilarity(reference.armSpread, student.armSpread, 0.08, 16),
      numericSimilarity(reference.reach, student.reach, 0.08, 18),
      numericSimilarity(reference.stance, student.stance, 0.08, 18),
      numericSimilarity(reference.level, student.level, 0.07, 20),
    ],
    [0.3, 0.26, 0.24, 0.2],
  );
}

function energyScore(referencePrevious, referenceNext, studentPrevious, studentNext) {
  const referenceVector = movementVector(referencePrevious, referenceNext);
  const studentVector = movementVector(studentPrevious, studentNext);
  if (!referenceVector && !studentVector) return 96;
  if (!referenceVector || !studentVector) return 74;
  const referenceVelocity = vectorVelocity(referenceVector);
  const studentVelocity = vectorVelocity(studentVector);
  return numericSimilarity(referenceVelocity, studentVelocity, 0.08, 14);
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
  els.matchValue.textContent = renderStars(matchToStars(scores.total));
  els.matchLabel.textContent = scores.total >= 85 ? "супер" : scores.total >= 70 ? "хорошо" : scores.total >= 50 ? "почти" : "еще раз";
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
    timing: 0,
    total: 0,
    score: 0,
  };
}

function updateScore(value) {
  updateLevelDisplay();
}

function matchToStars(match) {
  if (match >= 90) return 5;
  if (match >= 78) return 4;
  if (match >= 62) return 3;
  if (match >= 42) return 2;
  if (match >= 20) return 1;
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
  els.levelCardButton.title = "Открыть историю уровней";
  els.studentStarsBadge.textContent = `★ ${stars}`;
}

function showLevelOverlay() {
  renderLevelHistory();
  els.levelOverlay.hidden = false;
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
  const hasMarkers = hasLearningVideo && hasExamVideo && clipReady(state.learning) && clipReady(state.exam);

  els.pipelineSteps.forEach((step) => {
    const index = order.indexOf(step.dataset.step);
    const completed =
      (step.dataset.step === "upload" && hasLearningVideo && hasExamVideo) ||
      (step.dataset.step === "scan" && hasReference) ||
      (step.dataset.step === "review" && hasReference && activeIndex > index) ||
      (step.dataset.step === "markers" && hasMarkers && activeStep === "publish");

    step.classList.toggle("active", index === activeIndex);
    step.classList.toggle("completed", completed);
  });

  els.publishLessonButton.disabled = !(hasReference && hasMarkers);
}

function updateLessonFlow(activeStep) {
  const order = ["choose", "practice", "exam", "result"];
  const activeIndex = Math.max(0, order.indexOf(activeStep));

  els.lessonFlowSteps.forEach((step, index) => {
    step.classList.toggle("active", index === activeIndex);
    step.classList.toggle("completed", index < activeIndex);
  });
}

function showResultOverlay(attempt) {
  const stars = Number.isFinite(attempt.stars) ? attempt.stars : matchToStars(attempt.match || 0);
  const info = levelInfoFromStars(totalStars());
  const tip = resultTipFromScores(attempt.scores);

  els.resultStars.textContent = renderStars(stars);
  els.resultTitle.textContent = stars >= 5 ? "Идеальная сдача" : stars >= 3 ? "Уровень пройден" : "Еще немного тренировки";
  const coverageText = Number.isFinite(attempt.scores?.coverage) ? ` · кадры ${attempt.scores.coverage}%` : "";
  els.resultDetails.textContent = `${attempt.match}% совпадения · ${stars} из 5 звезд${coverageText} · ${tip}`;
  els.resultLevelBadge.textContent = `★${info.current.level}`;
  els.resultLevelName.textContent = info.current.name;
  renderMistakes(attempt.scores?.mistakes || []);
  els.resultOverlay.hidden = false;
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
  clip.start = Math.max(0, teacherVideo.currentTime || 0);
  clip.startSet = true;
  normalizeClipRange(clip);
  updateExamControls();
  updatePipeline("markers");
  els.scanStatus.textContent = `Начало: ${formatTime(clip.start)}`;
  refreshReferenceForMarkers();
}

function markExamEnd() {
  if (!teacherVideo.src) return;
  const clip = activeClip();
  clip.end = Math.max(0, teacherVideo.currentTime || 0);
  clip.endSet = true;
  normalizeClipRange(clip);
  updateExamControls();
  updatePipeline("publish");
  els.scanStatus.textContent = `Конец: ${formatTime(activeClipEnd())}`;
  refreshReferenceForMarkers();
}

function refreshReferenceForMarkers() {
  if (state.activeTeacherVideo !== "exam" || !state.exam.objectUrl) return;
  state.reference = [];
  if (loadStoredReference()) {
    setUploadStatus("exam", "Эталон загружен из памяти", "ready");
    els.reviewStatus.textContent = "эталон сохранён";
    els.scanStatus.textContent = `${state.reference.length} кадров эталона из памяти`;
    updatePipeline("review");
    renderTeacherPoseFrame();
  } else {
    setUploadStatus("exam", "Нажмите «Считать эталон»", "processing");
    els.reviewStatus.textContent = "эталон нужно считать";
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
  els.roleTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  els.studentPanel.hidden = view !== "student";
  els.teacherPanel.hidden = view !== "teacher";
  els.appShell.classList.toggle("student-mode", view === "student");
  els.appShell.classList.toggle("teacher-mode", view === "teacher");
}

function focusDanceStage() {
  switchView("student");
  updateLessonFlow("practice");
  document.querySelector(".stage-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setTeacherFolderView(view) {
  renderTeacherWorkspace();
  const studio = activeTeacherStudio();
  const group = activeTeacherGroup();
  const lesson = activeTeacherLesson();
  const meta = teacherFolderMeta(studio, group, lesson);
  const safeView = meta[view] ? view : "root";
  state.teacherFolderView = safeView;
  els.teacherFolderViews.forEach((panel) => {
    const active = panel.dataset.teacherView === safeView;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  els.teacherBreadcrumb.textContent = meta[safeView].breadcrumb;
  els.teacherBreadcrumb.innerHTML = renderTeacherBreadcrumb(safeView, studio, group, lesson);
  els.teacherFolderTitle.textContent = meta[safeView].title;
  const actionLabel = safeView === "root" && state.teacherWorkspace.studios.length ? "Открыть студию" : meta[safeView].action;
  els.teacherPrimaryAction.lastChild.textContent = ` ${actionLabel}`;
  els.teacherPrimaryAction.title = actionLabel;
  els.teacherPrimaryAction.hidden = safeView === "lesson";
  els.teacherBackButton.hidden = safeView === "root";
  if (lesson) els.teacherLessonOpenTitle.textContent = lesson.name;
  els.appShell.classList.toggle("teacher-lesson-open", safeView === "lesson");
}

function renderTeacherBreadcrumb(view, studio, group, lesson) {
  const parts = [{ label: "Мои пространства", view: "root" }];
  if (studio && ["studio", "group", "lesson"].includes(view)) parts.push({ label: studio.name, view: "studio" });
  if (group && ["group", "lesson"].includes(view)) parts.push({ label: group.name, view: "group" });
  if (lesson && view === "lesson") parts.push({ label: lesson.name, view: "lesson" });
  return parts
    .map((part, index) => {
      const active = index === parts.length - 1;
      const label = escapeHtml(part.label);
      return active
        ? `<span>${label}</span>`
        : `<button type="button" data-breadcrumb-view="${part.view}">${label}</button>`;
    })
    .join("<span aria-hidden=\"true\">/</span>");
}

function goTeacherBack() {
  const previousView = {
    studio: "root",
    group: "studio",
    lesson: "group",
  }[state.teacherFolderView];
  if (previousView) setTeacherFolderView(previousView);
}

function teacherFolderMeta(studio, group, lesson) {
  const studioName = studio?.name || "Студия";
  const groupName = group?.name || "Группа";
  const lessonName = lesson?.name || "Урок";
  return {
    root: {
      breadcrumb: "Мои пространства",
      title: "Кабинет педагога",
      action: "Создать студию",
    },
    studio: {
      breadcrumb: `Мои пространства / ${studioName}`,
      title: studioName,
      action: "Создать группу",
    },
    group: {
      breadcrumb: `Мои пространства / ${studioName} / ${groupName}`,
      title: groupName,
      action: "Создать урок",
    },
    lesson: {
      breadcrumb: `Мои пространства / ${studioName} / ${groupName} / ${lessonName}`,
      title: lessonName,
      action: "Опубликовать",
    },
  };
}

function renderTeacherWorkspace() {
  const { studios } = state.teacherWorkspace;
  els.teacherRootEmpty.hidden = studios.length > 0;
  els.teacherStudioList.innerHTML = studios.map((studio) => folderButton("studio", studio.id, studio.name, studio.description || "студия")).join("");
  const studio = activeTeacherStudio();
  els.teacherGroupList.innerHTML = studio?.groups?.length
    ? studio.groups.map((group) => folderButton("group", group.id, group.name, group.description || "группа")).join("")
    : emptyFolderText("В этой студии пока нет групп", "Нажмите плюс сверху, чтобы создать группу.");
  const group = activeTeacherGroup();
  els.teacherLessonList.innerHTML = group?.lessons?.length
    ? group.lessons.map((lesson) => folderButton("lesson", lesson.id, lesson.name, lesson.description || "урок")).join("")
    : emptyFolderText("В этой группе пока нет уроков", "Нажмите плюс сверху, чтобы создать урок.");
}

function folderButton(type, id, name, note) {
  const icon = type === "lesson" ? "▶" : "▣";
  return `
    <button class="folder-card" type="button" data-${type}-id="${escapeHtml(id)}">
      <span class="folder-icon" aria-hidden="true">${icon}</span>
      <strong>${escapeHtml(name)}</strong>
      <small>${escapeHtml(note)}</small>
    </button>
  `;
}

function emptyFolderText(title, text) {
  return `
    <div class="teacher-empty-note">
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

function activeTeacherLesson() {
  const group = activeTeacherGroup();
  return group?.lessons?.find((lesson) => lesson.id === state.teacherWorkspace.activeLessonId) || null;
}

function openTeacherCreateDialog() {
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
  const type = typeByView[state.teacherFolderView];
  if (!type) return;
  state.teacherCreateType = type;
  const labels = {
    studio: ["Создание студии", "Создать студию", "Название студии", "Введите название студии"],
    group: ["Создание группы", "Создать группу", "Название группы", "Введите название группы"],
    lesson: ["Создание урока", "Создать урок", "Название урока", "Введите название урока"],
  };
  const [eyebrow, title, nameLabel, placeholder] = labels[type];
  els.teacherCreateEyebrow.textContent = eyebrow;
  els.teacherCreateTitle.textContent = title;
  els.teacherCreateNameLabel.textContent = nameLabel;
  els.teacherCreateName.value = "";
  els.teacherCreateName.placeholder = placeholder;
  els.teacherCreateDescription.value = "";
  els.teacherCreateOverlay.hidden = false;
  window.requestAnimationFrame(() => els.teacherCreateName.focus());
}

function closeTeacherCreateDialog() {
  els.teacherCreateOverlay.hidden = true;
  state.teacherCreateType = "";
}

function submitTeacherCreateDialog(event) {
  event.preventDefault();
  const name = els.teacherCreateName.value.trim();
  if (!name) return;
  const description = els.teacherCreateDescription.value.trim();
  const id = `${state.teacherCreateType}-${Date.now().toString(36)}`;
  if (state.teacherCreateType === "studio") {
    state.teacherWorkspace.studios.push({ id, name, description, groups: [] });
    state.teacherWorkspace.activeStudioId = id;
    closeTeacherCreateDialog();
    setTeacherFolderView("studio");
    return;
  }
  if (state.teacherCreateType === "group") {
    const studio = activeTeacherStudio();
    if (!studio) return;
    studio.groups.push({ id, name, description, lessons: [] });
    state.teacherWorkspace.activeGroupId = id;
    closeTeacherCreateDialog();
    setTeacherFolderView("group");
    return;
  }
  if (state.teacherCreateType === "lesson") {
    const group = activeTeacherGroup();
    if (!group) return;
    group.lessons.push({ id, name, description });
    state.teacherWorkspace.activeLessonId = id;
    closeTeacherCreateDialog();
    setTeacherFolderView("lesson");
  }
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
      if (landmarks) {
        drawPose(studentCtx, studentCanvas, landmarks, "#2dd4bf");
        const normalized = normalizeLandmarks(landmarks);
        const sample = {
          time: teacherStart + (rawTime - start),
          rawTime,
          displayLandmarks: cloneLandmarks(landmarks),
          angles: poseAngles(landmarks),
          landmarks: normalized,
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
