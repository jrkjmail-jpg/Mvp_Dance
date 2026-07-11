# Черновик модели данных

Документ фиксирует начальный набор сущностей для будущего backend.

## Studio

- id
- name
- description
- avatarUrl
- coverUrl
- address
- directions
- ownerUserId
- status
- createdAt
- updatedAt

## Teacher

- id
- userId
- studioId
- role
- name
- phone
- email
- createdAt

## Student

- id
- studioId
- groupId
- firstName
- lastName
- nickname
- birthDate
- avatarUrl
- coverUrl
- styles
- status
- createdAt
- updatedAt

## ParentConsent

- id
- studentId
- parentName
- parentPhone
- parentEmail
- acceptedTerms
- acceptedPersonalDataPolicy
- acceptedVideoProcessing
- acceptedAt
- ip
- userAgent

## Group

- id
- studioId
- parentGroupId
- type
- title
- categoryLabel
- description
- createdAt
- updatedAt

## Lesson

- id
- studioId
- groupId
- title
- description
- durationSec
- coverUrl
- status
- createdBy
- createdAt
- updatedAt

## LessonVideo

- id
- lessonId
- type
- fileUrl
- thumbnailUrl
- durationSec
- trimStartSec
- trimEndSec
- createdAt

Типы:

- `training`
- `reference`

## Submission

- id
- lessonId
- studentId
- status
- scorePercent
- stars
- createdAt
- updatedAt

## Attempt

- id
- submissionId
- studentId
- lessonId
- scorePercent
- stars
- skeletonDataUrl
- videoUrl
- breakdown
- createdAt

## Invite

- id
- studioId
- groupId
- studentDraftId
- tokenHash
- status
- expiresAt
- createdAt
- acceptedAt

## AuditLog

- id
- actorUserId
- studioId
- action
- entityType
- entityId
- payload
- createdAt

