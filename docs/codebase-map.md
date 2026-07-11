# Codebase map

Карта текущего `app.js` перед аккуратным рефакторингом.

Цель документа — понимать, какие группы функций уже есть в коде, куда их потом переносить и в каком порядке это безопаснее делать.

Важно: этот документ не означает, что код нужно переносить сразу. Он нужен как схема перед дальнейшей работой.

## 1. Общее состояние

Сейчас `app.js` содержит почти всю логику приложения:

- инициализация;
- состояние приложения;
- MediaPipe;
- работа с камерой и видео;
- загрузка видео педагога;
- загрузка видео ученика;
- считывание эталона;
- оценка попытки;
- отрисовка скелета;
- кабинет ученика;
- кабинет педагога;
- студия;
- группы и уроки;
- приглашения;
- модальные окна;
- работа с `localStorage`;
- изображения и обложки.

Это нормально для MVP, но плохо для масштабирования.

## 2. Будущие зоны ответственности

### `src/storage`

Будущий слой хранения.

Текущие функции-кандидаты:

- `readStoredJson`
- `readStoredTheme`
- `persistTeacherWorkspace`
- `persistStudentProfile`
- `persistFavoriteLessons`
- `saveStoredReference`
- `loadStoredReference`
- `referenceStorageKey`

Также сюда относятся прямые вызовы:

- `localStorage.getItem`
- `localStorage.setItem`
- `JSON.parse`
- `JSON.stringify` для хранения состояния.

Это лучший первый слой для выноса.

### `src/scoring`

Будущий слой оценки.

Текущие функции-кандидаты:

- `evaluateRecordedAttempt`
- `calibratedMatchTotal`
- `calibratedMetricScore`
- `filterReportedMistakes`
- `reconcileMicroJitterScores`
- `shouldReportMistake`
- `weakestMomentLabel`
- `grossMistakeScore`
- `average`
- `weightedAverage`
- `movementSignature`
- `limbCategory`
- `bendCategory`
- `torsoCategory`
- `jointCategoryGroupScore`
- `poseShapeScore`
- `categoryOrNumberScore`
- `classifyMovementMoment`
- `adaptiveMomentScore`
- `trajectoryScore`
- `amplitudeScore`
- `energyScore`
- `motionScore`
- `motionStatsForAttempt`
- `totalMovement`
- `movementVelocity`
- `vectorVelocity`
- `vectorDistance`
- `movementVector`
- `directionSimilarity`
- `numericSimilarity`
- `averagePoint`
- `midpoint`
- `distance`
- `poseAngles`
- `angleAt`
- `angleGroupScore`
- `timingScore`
- `landmarkGroupScore`
- `normalizeLandmarks`
- `normalizeWorldLandmarks`
- `matchToStars`
- `totalStars`
- `levelInfoFromStars`

Эти функции желательно сделать максимально чистыми: входные данные → результат, без DOM.

### `src/pose`

Будущий слой MediaPipe и скелета.

Текущие функции-кандидаты:

- `initPose`
- `loadPoseRuntime`
- `createPoseLandmarker`
- `safeDetectPose`
- `safeDetectPoseForVideo`
- `drawPose`
- `boneColor`
- `isVisible`
- `shouldDrawPoint`
- `shouldDrawBone`
- `isSanePixelSegment`
- `pixelDistance`
- `isCollapsedIntoTorso`
- `clearCanvas`
- `resizeCanvasToVideo`
- `getVideoDrawRect`
- `toCanvasX`
- `toCanvasY`
- `renderTeacherPoseFrame`
- `renderStudentPoseFrame`

Этот слой нельзя трогать первым, потому что он влияет на производительность и задержку скелета на iPhone.

### `src/media`

Будущий слой видео, камеры и файлов.

Текущие функции-кандидаты:

- `resetFileInputBeforePick`
- `onTeacherUpload`
- `startCamera`
- `openStudentCamera`
- `onStudentVideoUpload`
- `revealUploadedVideoFrame`
- `clipFor`
- `activeClip`
- `resetClip`
- `showUploadPreview`
- `bindTeacherVideoToClip`
- `showClipStartFrame`
- `switchTeacherVideo`
- `setTeacherVideoNativeControls`
- `buildReferenceFromExam`
- `scanTeacherVideo`
- `cancelTeacherScan`
- `toggleTeacherPlayback`
- `toggleStudentPlayback`
- `seekStudentFromTimeline`
- `seekTeacherFromTimeline`
- `updateStudentVideoTime`
- `syncStudentTimeline`
- `updateStudentPlayButton`
- `markStudentStart`
- `markStudentEnd`
- `updateStudentMarkerTicks`
- `syncTeacherTimeline`
- `updateTeacherPlayButton`
- `updateMarkerTicks`
- `buildStudentSkeleton`
- `waitForMetadata`
- `waitForMediaReady`
- `seekMedia`
- `seekTeacher`
- `seekStudentVideo`
- `nextFrame`
- `delay`

Сюда же позже можно вынести:

- генерацию обложки из видео;
- работу с `URL.createObjectURL`;
- загрузку файлов.

### `src/student`

Будущий слой кабинета ученика.

Текущие функции-кандидаты:

- `startPractice`
- `toggleDance`
- `finishAttempt`
- `finalizeAttemptResult`
- `runExamCountdown`
- `hideCountdown`
- `recordStudentFrame`
- `showStudentStudioProfile`
- `renderStudentStudioProfile`
- `studentStudioAccess`
- `findStudentRecordForProfile`
- `findStudioGroupById`
- `firstStudioGroup`
- `accessibleLessonsForGroup`
- `renderStudentStudioMaterials`
- `studentAccessibleLessonCard`
- `studentEmptyLessonCard`
- `openStudentAccessibleLesson`
- `isLessonAccessible`
- `studentAccessCurrentPath`
- `renderStudentMaterialsPath`
- `openStudentAccessGroup`
- `openStudentAccessSubgroup`
- `backStudentStudioFolder`
- `renderDancerProfileDetails`
- `renderDancerCompletedLessons`
- `renderFavoriteLessonCards`
- `collectAllTeacherLessons`
- `isLessonFavorite`
- `toggleLessonFavorite`
- `handleLessonLikeEvent`
- `updateStudentProfileImage`
- `renderLevelHistory`
- `levelStatusText`
- `pluralizeStars`
- `updateLessonFlow`
- `advanceStudentLessonStep`
- `showResultOverlay`
- `resultDetailsText`
- `retakeStudentAttempt`
- `publishStudentAttempt`
- `renderAttempts`

### `src/teacher`

Будущий слой кабинета педагога.

Текущие функции-кандидаты:

- `updatePipeline`
- `updateTeacherWizard`
- `updateTeacherUploadTarget`
- `advanceTeacherWizard`
- `publishTeacherLesson`
- `renderTeacherStudentProgress`
- `setTeacherFolderView`
- `renderTeacherBreadcrumb`
- `updateTeacherStudioHeaderState`
- `teacherStudentFolderTitle`
- `updateTeacherSpaceHeading`
- `goTeacherBack`
- `teacherFolderMeta`
- `renderTeacherWorkspace`
- `renderStudioChannel`
- `updateTeacherStudioInlineImage`
- `setStudioLibraryTab`
- `renderStudioLibraryTab`
- `renderTeacherStudents`
- `isWaitingRegistrationStudent`
- `studentStatusLabel`
- `studentGroupFolderCard`
- `pluralizeStudents`
- `openTeacherEditDialog`
- `closeTeacherEditDialog`
- `openTeacherInviteDialog`
- `closeTeacherInviteDialog`
- `renderInviteGroupOptions`
- `teacherStudioGroupOptions`
- `submitTeacherInviteDialog`
- `openTeacherStudentProfile`
- `closeTeacherStudentProfile`
- `onTeacherEditImage`
- `onTeacherEditCover`
- `submitTeacherEditDialog`
- `openTeacherCreateDialog`
- `closeTeacherCreateDialog`
- `submitTeacherCreateDialog`
- `normalizeTeacherWorkspace`

### `src/studio`

Будущий слой студий, групп, уроков и материалов.

Текущие функции-кандидаты:

- `activeTeacherStudio`
- `activeTeacherGroup`
- `activeTeacherSubgroupPath`
- `activeTeacherContainer`
- `activeTeacherLesson`
- `deleteTeacherFolderItem`
- `removeFromNestedGroups`
- `findTeacherFolderItemName`
- `activeTeacherEditableItem`
- `folderButton`
- `folderMarkStyle`
- `lessonFolderCard`
- `deleteFolderControl`
- `lessonDurationLabel`
- `formatLessonDuration`
- `itemSummary`
- `emptyFolderText`
- `renderStudioAchievements`
- `renderAchievementsInto`
- `renderAwardShelfInto`
- `awardShelfItem`
- `awardArchiveButton`
- `normalizeStudioAchievements`
- `achievementsToText`
- `syncAchievementTextarea`
- `renderAchievementEditor`
- `toggleAchievementForm`
- `addTeacherAchievementFromForm`
- `removeTeacherAchievement`
- `clearAchievementForm`
- `parseAchievementsText`

Часть достижений сейчас может быть неактуальна визуально, но код еще присутствует. Перед переносом нужно решить: удалять, оставить или отложить.

### `src/ui`

Будущий слой общих UI-действий.

Текущие функции-кандидаты:

- `setButtons`
- `setUploadStatus`
- `showScanOverlay`
- `updateMeters`
- `emptyScores`
- `updateScore`
- `renderStars`
- `updateLevelDisplay`
- `showLevelOverlay`
- `openLevelHistory`
- `closeLevelHistory`
- `switchView`
- `setAccountButtonImage`
- `updateAccountAvatars`
- `syncAccountMenuPrimary`
- `updateAccountNav`
- `closeStudentPages`
- `goStudentHome`
- `openAccountTarget`
- `updateStageHeaderForView`
- `applyTheme`
- `openSettings`
- `closeSettings`
- `updateSettingsEditAction`
- `openCurrentCabinetEditor`
- `openStudentEditDialog`
- `closeStudentEditDialog`
- `toggleTheme`
- `focusDanceStage`
- `renderDanceStyleOptions`
- `submitStudentProfile`
- `submitStudentEditDialog`

Часть этих функций позже лучше разделить между `ui`, `student` и `teacher`.

### `src/utils`

Будущие утилиты.

Текущие функции-кандидаты:

- `cloneLandmarks`
- `lerp`
- `roundScore`
- `readFileAsDataUrl`
- `optimizeCoverImage`
- `ensureActiveLessonThumbnailFromVideo`
- `captureVideoThumbnail`
- `waitForDetachedVideoMetadata`
- `seekDetachedVideo`
- `waitForDetachedVideoFrame`
- `optimizeAvatarImage`
- `loadImageSource`
- `normalizeExternalLink`
- `escapeHtml`
- `ageFromBirthDate`
- `profileBirthDate`
- `updateExamMarker`
- `updateExamControls`
- `updateCurrentVideoTime`
- `updateMirror`
- `examEnd`
- `activeClipEnd`
- `clipEnd`
- `clipReady`
- `normalizeClipRange`
- `clamp`
- `formatTime`

Некоторые из этих функций относятся к `media`, но начать можно с независимых утилит.

## 3. Самый безопасный порядок выноса

### 1. Storage

Почему первым:

- меньше всего влияет на визуал;
- легко проверить;
- поможет позже подключить backend.

Что делать:

- создать функции-обертки;
- заменить прямые вызовы `localStorage`;
- не менять формат данных.

### 2. Utils

Почему вторым:

- часть функций независима;
- их легко тестировать;
- они не должны менять поведение UI.

### 3. Scoring

Почему третьим:

- важная бизнес-логика;
- её можно тестировать отдельно;
- нужно не трогать MediaPipe одновременно.

### 4. Pose

Почему позже:

- высокая чувствительность к iPhone;
- риск задержки скелета;
- любое изменение нужно проверять на реальном устройстве.

### 5. Media

Почему после pose/scoring:

- много связей с DOM;
- видео, таймлайны и загрузки легко сломать.

### 6. Student / Teacher / Studio

Почему после базовых слоев:

- там много UI и состояния;
- переносить лучше по экрану, а не кусками по всему файлу.

## 4. Что не трогать пока

Пока не стоит переносить:

- обработчики всей страницы целиком;
- MediaPipe;
- видео-таймлайны;
- мобильную шапку;
- CSS-адаптив;
- создание урока;
- сдачу урока.

Эти зоны слишком чувствительные.

## 5. Первый реальный кодовый шаг

Когда будем готовы трогать код, первый шаг:

1. создать `src/storage/local-storage.js`;
2. перенести туда функции чтения/записи JSON;
3. подключить этот файл в `index.html` перед `app.js`;
4. заменить только `readStoredJson`, `readStoredTheme` и простые persist-функции;
5. проверить приложение.

Но пока этот документ только фиксирует карту. Код приложения не изменен.

