import LocalizedStrings from "react-localization";

// To add more supported languages, add the Country Key (eg.English -> en). Keys can be found here https://material-ui.com/guides/localization/.
let strings = new LocalizedStrings({
  //  Default - English  //
  en: {
    // SEO (MataData & WelcomePage & SiteHeaderWelcome)
    mainTitle: "Popitalk - Watch together",
    mainDescription:
      "Watch youtube, twitch, anime, and cruncyroll together with friends on Popitalk. Watch at the same time in sync while chatting. Popitalk is exactly what you need with your friends to watch together. Create a free account, add friends and start watching together today!",
    mainKeywords:
      "watch, together, with, friends, youtube, anime, videos, in, sync, at, the, same, time, chat, rabbit, w2g, watch2gether, watchtogether",
    loginPageTitle: "Popitalk - Watch together - Log In or Sign Up",
    loginPageDescription:
      "Watch youtube, twitch, anime, and cruncyroll together with friends on Popitalk. Watch at the same time in sync while chatting. Popitalk is exactly what you need with your friends to watch together. Create a free account, add friends and start watching together today!",
    createChannelTitle: "Create Channel - Popitalk - Watch together",
    createChannelDescription:
      "Create a channel on Popitalk. Watch youtube, twitch, anime, and cruncyroll together with friends on Popitalk. Watch at the same time in sync while chatting. Popitalk is exactly what you need with your friends to watch together. Create a free account, add friends and start watching together today!",
    loginUsername: "Username or email",
    loginPassword: "Password",

    // Moment.JS
    location: "en",
    // CreateNewAccountForm & EditInformationForm & EditBirthdayForm
    createNewAccountTitle: "Create a new account",
    createNewAccountSubtitle: "Get the full experience. It's FREE!",
    createNewAccountFirstName: "First Name",
    createNewAccountLastName: "Last Name",
    createNewAccountEmail: "Email",
    createNewAccountUsername: "Username",
    createNewAccountPassword: "Password",
    createNewAccountBirthday: "Birthday",
    createNewAccountTerms: "By clicking Sign Up, you agree to the",
    createNewAccountTerms1: "Terms and Policy.",
    // functions.js input errors
    inputTextTooShort: "Too short *",
    inputTextTooLong: "Too long *",
    inputTextRequired: "Required *",
    ageLimitText: "You can't use Popitalk if you are younger than 13.",
    invalidEmail: "Invalid email *",
    passwordTooShort: "At least 6 characters needed *",
    passwordTooLong: "Maximum 32 characters *",
    lowerCaseRequired: "At least one lowercase letter needed *",
    upperCaseRequired: "At least one uppercase letter needed *",
    numberRequired: "Password should have at least one number.",
    newPasswordRequirement: "It must be different from your old password.",
    // Footer
    company: "Company",
    aboutPopitalk: "About Popitalk",
    blog: "Blog",
    contact: "Contact",
    legal: "Legal",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    copyright: "Copyright",
    community: "Community",
    discord: "Discord",
    twitter: "Twitter",
    youtube: "Youtube",
    facebook: "Facebook",
    // Buttons
    loginButton: "Log In",
    createNewAccountButton: "Sign Up",
    createChannelButton: "Create",
    newRoomButton: "New Chat",
    requestVideoButton: "Send a request to the admin",
    createButton: "Create",
    resetButton: "Reset",
    followButton: "Follow",
    followingButton: "Following",
    searchFriendsClose: "Close",
    clearButton: "Clear",
    addFriendsButton: "Add Friend",
    requestSentButton: "Request sent",
    cancelButton: "Cancel",
    deleteButton: "Delete",
    loadMoreButton: "Show more",
    backToTrendingButton: "Back to Trending",
    sendFeedbackButton: "About Popitalk",
    // Months
    jan: "January",
    feb: "February",
    mar: "March",
    apr: "April",
    may: "May",
    jun: "June",
    jul: "July",
    aug: "August",
    sep: "September",
    oct: "October",
    nov: "November",
    dec: "December",
    // PanelHeader & MiniFriendsList
    channels: "Channels",
    friends: "Chat",
    // ChannelsPanel & FriendsPanel
    yourChannels: "Your Channels",
    yourChannelsPlaceholder: "Create your own public Channel!",
    followingChannels: "Following",
    followingChannelsPlaceholder: "Discover and Follow Channels!",
    searchFriendsInput: "Search Username",
    searchResult: "Results for",
    // RoomIcon
    myRoom: "You",
    // ChannelsList
    online: "online",
    // RecommendedView
    channelSearchInput: "Search for a channel",
    videoSearchInput: "Search for a video",
    following: "# Following",
    discover: "# Discover",
    trending: "# Trending",
    // ChannelCard
    nothingPlaying: "Nothing is playing at this moment",
    // VideoCard
    watch: "Watch it in a room",
    // ChannelHeader
    video: "Video",
    posts: "Posts",
    upNext: "Playlist",
    settings: "Settings",
    // VideoPlayer & VideoStatus
    paused: "Paused",
    startingIn: "Starting in",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    fullScreen: "Full screen",
    playing: "Playing",
    // Chat Header & ChatAction
    roomMembers: "room members",
    followers: "followers",
    chatInput: "Type a message...",
    chatDisabledText: "Follow the channel to send a message.",
    // SortableList & ChannelQueue & VideoMinimalQueueCard
    findMoreVideos: "Search for videos",
    manageUpNext: "Manage Playlist",
    upNextSubtitle:
      "Add, delete or change the orders of the videos. You can add up to 30 videos.",
    searchAddVideos: "Search and add more videos below!",
    //ChannelDescription & NewChannelPost & ChannelPost
    admins: "Admins",
    postInput: "Post something...",
    like: "Like",
    likes: "Likes",
    comment: "Comment",
    comments: "Comments",
    channelWelcomePost:
      "This is the start! Make an awesome channel and have fun watching together!",
    deletePost: "Delete post",
    deletePostSubtitle:
      "Are you sure you want to delete this Post? You cannot undo this action.",
    //CreateChannel > ChannelForm, ChannelFormSubmit
    selectChannelIcon: "Select Channel Icon",
    changeChannelIcon: "Change Channel Icon",
    createChannelName: "Channel Name *",
    channelNameInput: "Name your channel",
    createChannelDesc: "Channel Description *",
    channelDescInput: "Describe your channel",
    channelCatagory: "Channel Catagory (optional)",
    readyToCreate: "Ready to create your own channel?",
    saveChannelEdit: "Remember to save your changes.",
    // ChannelSettingsPanel
    channelSettings: "Channel Settings",
    manageFollowers: "Manage Followers",
    manageAdmins: "Manage Admins",
    manageBannedUsers: "Manage Banned Users",
    deleteChannel: "Delete Channel",
    deleteChannelSubtitle:
      "Are you sure you want to delete your channel? You cannot undo this action.",
    // ContainerHeader
    friendRequestHeader: "Friend Requests",
    notificationHeader: "Notification",
    settingsHeader: "Settings",
    accountSettings: "Account Settings",
    blockedUsers: "Blocked Users",
    logOut: "Log Out",
    editUserInformation: "Edit User Information",
    changePassword: "Change Password",
    // InfoCardList
    nothingToShow: "Nothing to show :(",
    // SearchResults
    noVideosFound: "No videos found",
    // GifTable
    sendText: "Send",
    searchGifInput: "Search for a GIF",
    // DeleteMessageModal
    deleteMessageTitle: "Delete Message",
    deleteMessageSubtitle: "Are you sure you want to delete this message?",
    // ProfileModal
    friendsText: "Friends"
  },

  //  KOREAN  //
  ko: {
    // Moment.JS
    location: "ko",
    // WelcomePage & SiteHeaderWelcome
    mainTitle: "Popitalk - 같이보는 TV",
    mainDescription:
      "Popitalk으로 친구와 가족들과 유튜브 같이 시청하고 채팅해요. 새로운 채널을 구독하고 재미있는 영상을 시청하세요",
    mainKeywords:
      "watch, together, with, friends, youtube, anime, videos, in, sync, at, the, same, time, chat, rabbit, w2g, watch2gether, watchtogether",
    loginPageTitle: "Popitalk - 같이보는 TV - 로그인 또는 회원가입",
    loginPageDescription:
      "Popitalk 계정을 만들거나 로그인하세요. 친구, 가족, 아는 사람들과 유튜브 같이 시청하고 채팅해요.",
    createChannelTitle: "채널 만들기 - Popitalk",
    createChannelDescription:
      "포피톡에서 채널을 개설하세요. 재미있는 영상들을 재생하고 팔로워들과 소통하세요.",
    loginUsername: "이메일 또는 아이디",
    loginPassword: "비밀번호",
    // CreateNewAccountForm & EditInformationForm & EditBirthdayForm
    createNewAccountTitle: "가입하기",
    createNewAccountSubtitle:
      "빠르고 간편하게 같이 시청하세요. 무료 서비스입니다.",
    createNewAccountFirstName: "이름",
    createNewAccountLastName: "성(姓)",
    createNewAccountEmail: "이메일",
    createNewAccountUsername: "아이디",
    createNewAccountPassword: "비밀번호",
    createNewAccountBirthday: "생년월일",
    createNewAccountTerms:
      "가입하기 버튼을 클릭하면 Popitalk의 약관정책에 동의하게 됩니다.",
    createNewAccountTerms1: "이용약관 확인.",
    // functions.js input errors
    inputTextTooShort: "너무 짧습니다 *",
    inputTextTooLong: "너무 깁니다 *",
    inputTextRequired: "필수 항목 *",
    ageLimitText: "만 13세 이하는 이용하실 수 없습니다.",
    invalidEmail: "잘못된 이메일 형식입니다.",
    passwordTooShort: "최소 6자여야 합니다.",
    passwordTooLong: "최대 32자까지 가능합니다.",
    lowerCaseRequired: "소문자가 최소한 1개가 필요합니다.",
    upperCaseRequired: "대문자가 최소한 1개가 필요합니다.",
    numberRequired: "최소한 숫자 1개가 필요합니다.",
    newPasswordRequirement: "전 비밀번호와 다르게 설정해주세요.",
    // Footer
    company: "회사소개",
    aboutPopitalk: "Popitalk에 대해서",
    blog: "블로그",
    contact: "연락하기",
    legal: "정책",
    termsOfUse: "이용약관",
    privacyPolicy: "개인정보 정책",
    copyright: "저작권",
    community: "커뮤니티",
    discord: "디스코드",
    twitter: "트위터",
    youtube: "유튜브",
    facebook: "페이스북",
    // Buttons
    loginButton: "로그인",
    createNewAccountButton: "가입하기",
    createChannelButton: "만들기",
    newRoomButton: "방 만들기",
    requestVideoButton: "채널 관리자한테 요청하세요",
    createButton: "만들기",
    resetButton: "초기화",
    followButton: "팔로우",
    followingButton: "팔로잉",
    searchFriendsClose: "닫기",
    clearButton: "지우기",
    addFriendsButton: "친구 추가",
    requestSentButton: "친추 보냄",
    cancelButton: "취소",
    deleteButton: "삭제",
    loadMoreButton: "더 보기",
    backToTrendingButton: "처음으로",
    sendFeedbackButton: "포피톡 팀",
    // Months
    jan: "1월",
    feb: "2월",
    mar: "3월",
    apr: "4월",
    may: "5월",
    jun: "6월",
    jul: "7월",
    aug: "8월",
    sep: "9월",
    oct: "10월",
    nov: "11월",
    dec: "12월",
    // PanelHeader & MiniFriendsList
    channels: "티비채널",
    friends: "채팅",
    // ChannelsPanel & FriendsPanel
    yourChannels: "내 채널",
    yourChannelsPlaceholder: "나만의 채널을 만들어 보세요!",
    followingChannels: "팔로잉 채널",
    followingChannelsPlaceholder: "채널을 팔로우 할 수 있습니다",
    searchFriendsInput: "아이디로 친구 찾기",
    searchResult: "검색 결과",
    // RoomIcon
    myRoom: "내 톡방",
    // ChannelsList
    online: "온라인",
    // RecommendedView
    channelSearchInput: "채널 검색",
    videoSearchInput: "동영상 검색",
    following: "# 팔로잉",
    discover: "# 추천",
    trending: "# 인기",
    // ChannelCard
    nothingPlaying: "재생되고 있는 영상이 없습니다",
    // VideoCard
    watch: "톡방에서 시청하기",
    // ChannelHeader
    video: "티비",
    posts: "프로필",
    upNext: "재생 목록",
    settings: "설정",
    // VideoPlayer & VideoStatus
    paused: "일시정지",
    startingIn: "곧 재생됩니다",
    play: "재생",
    pause: "일시정지",
    mute: "음소거",
    unmute: "음소거 해제",
    fullScreen: "전체화면",
    playing: "재생중",
    // ChatHeader & ChatActions
    roomMembers: "대화상대",
    followers: "팔로워",
    chatInput: "메시지를 작성하세요...",
    chatDisabledText: "팔로우를 해야 메시지를 보낼 수 있습니다.",
    // SortableList
    findMoreVideos: "더 많은 영상을 검색하세요",
    manageUpNext: "재생 목록을 관리하세요",
    upNextSubtitle:
      "동영상을 재생 목록에 추가, 삭제 혹은 이동할 수 있습니다. 최대 30개까지 추가가능 합니다.",
    searchAddVideos: "밑에서 동영상을 검색하고 추가하세요!",
    //ChannelDescription & NewChannelPost & ChannelPost & ChannelChat
    admins: "관리자",
    postInput: "게시글을 입력하세요...",
    like: "좋아요",
    likes: "좋아요",
    comment: "댓글",
    comments: "댓글",
    channelWelcomePost: "채널을 개설했습니다!",
    deletePost: "포스트 삭세",
    deletePostSubtitle: "포스트를 삭제하면 복구할 수 없습니다.",
    //CreateChannel > ChannelForm, ChannelFormSubmit
    selectChannelIcon: "채널 프사 업로드",
    changeChannelIcon: "채널 프사 변경",
    createChannelName: "채널 이름 *",
    channelNameInput: "이름을 지어주세요",
    createChannelDesc: "채널 설명 *",
    channelDescInput: "어떤 채널인가요?",
    channelCatagory: "카테고리 (선택)",
    readyToCreate: "채널 개설 준비되셨습니까?",
    saveChannelEdit: "변경된 내용을 저장하시겠습니가?",
    // ChannelSettingsPanel
    channelSettings: "채널 설정",
    manageFollowers: "팔로워 관리",
    manageAdmins: "관리자 설정",
    manageBannedUsers: "차단 목록",
    deleteChannel: "채널 삭제",
    deleteChannelSubtitle: "채널을 삭제하면 복구할 수 없습니다.",
    // ContainerHeader
    friendRequestHeader: "친구 추가",
    notificationHeader: "알림",
    settingsHeader: "설정",
    accountSettings: "계정 설정",
    blockedUsers: "차단 목록",
    logOut: "로그아웃",
    editUserInformation: "내 정보 변경",
    changePassword: "비밀번호 변경",
    // InfoCardList
    nothingToShow: "항목이 비었습니다.",
    // SearchResults
    noVideosFound: "검색 결과가 없습니다.",
    // GifTable
    sendText: "보내기",
    searchGifInput: "GIF 검색",
    // DeleteMessageModal
    deleteMessageTitle: "메세지 삭제",
    deleteMessageSubtitle: "삭제된 메세지는 복구가 불가합니다.",
    // ProfileModal
    friendsText: "친구"
  },

  //  Russian  //
  ru: {
    // Moment.JS
    location: "ru",
    // WelcomePage & SiteHeaderWelcome
    loginPageTitle: "Popitalk - Войдите или зарегистрируйтесь",
    loginPageDescription:
      "Создайте учетную запись или войдите в Popitalk.  БЕСПЛАТНО. Общайтесь с друзьями, семьей и начните смотреть вместе!",
    title: "Попиталк",
    description:
      "Смотрите вместе! Общайтесь с друзьями, семьей и начните смотреть вместе! Мы уверены,что текстовые сообщения станут еще веселее и приятнее",
    createChannelTitle: "Создать канал- popitalk",
    createChannelDescription:
      "Создай свой канал на Popitalk.  Добавляй видео в начало и наслаждайся вместе с подписчиками!  Мы делаем текстовые сообщения более увлекательными и приятными.",
    loginUsername: "Введите логин или почту",
    loginPassword: "Пароль",
    // CreateNewAccountForm & EditInformationForm & EditBirthdayForm
    createNewAccountTitle: "Создать новый аккаунт",
    createNewAccountSubtitle: "Испробуй сейчас. Бесплатно",
    createNewAccountFirstName: "Имя",
    createNewAccountLastName: "Фамилия",
    createNewAccountEmail: "Адрес электронной почты",
    createNewAccountUsername: "Имя пользователя",
    createNewAccountPassword: "Пароль",
    createNewAccountBirthday: "Дата рождения",
    createNewAccountTerms: "Нажимая Зарегистрироваться, вы соглашаетесь с.",
    createNewAccountTerms1: "Условия",
    // functions.js input errors
    inputTextTooShort: "Слишком короткий *",
    inputTextTooLong: "Слишком длинный *",
    inputTextRequired: "Обязательно *",
    ageLimitText: "Popitalk могут использовать лица старше 13 лет",
    invalidEmail: "Неверный адрес электронной почты.",
    passwordTooShort: "Необходимо минимум 6 символов.",
    passwordTooLong: "Максимум 32 символа.",
    lowerCaseRequired: "Требуется хотя бы одна срочная буква.",
    upperCaseRequired: "Требуется хотя бы одна заглавная буква.",
    numberRequired: "Пароль должен содержать хотя бы одну цифру",
    newPasswordRequirement: "Он должен отличаться от вашего старого пароля.",
    // Footer
    company: "Команда",
    aboutPopitalk: "О Popitalk",
    blog: "Блог",
    contact: "Контакт",
    legal: "Легально",
    termsOfUse: "Условия использования",
    privacyPolicy: "Политика конфиденциальности",
    copyright: "Авторские права",
    community: "Сообщества",
    discord: "Discord",
    twitter: "Twitter",
    youtube: "Youtube",
    // Buttons
    loginButton: "Войти",
    createNewAccountButton: "Зарегистрироваться",
    createChannelButton: "Создать",
    newRoomButton: "Создать новый чат",
    requestVideoButton: "Отправить заявку админу",
    createButton: "Создать",
    resetButton: "Сброс",
    followButton: "Подписаться",
    followingButton: "Подписчики",
    searchFriendsClose: "Закрыть",
    // clearButton: "지우기",
    addFriendsButton: "Добавить друга",
    // requestSentButton: "친추 보냄",
    // cancelButton: "취소",
    // Months
    jan: "Январь",
    feb: "Февраль",
    mar: "Март",
    apr: "Апрель",
    may: "Май",
    jun: "Июнь",
    jul: "Июль",
    aug: "Август",
    sep: "Сентябрь",
    oct: "Октябрь",
    nov: "Ноябрь",
    dec: "Декабрь",
    // PanelHeader & MiniFriendsList
    channels: "Каналы",
    friends: "Чат",
    // ChannelsPanel & FriendsPanel
    yourChannels: "Твои каналы",
    yourChannelsPlaceholder: "Создать свой собственный канал",
    followingChannels: "Следующий",
    followingChannelsPlaceholder: "Находи и подписывается!",
    searchFriendsInput: "Поиск по имени пользователя",
    searchResult: "Результаты поиска",
    // RoomIcon
    myRoom: "Мой чат",
    // ChannelsList
    online: "В сети",
    // RecommendedView
    channelSearchInput: "Поиск канала",
    videoSearchInput: "Поиск видео",
    following: "# Подписчики",
    discover: "# Найти",
    trending: "# В тренде",
    // ChannelCard
    nothingPlaying: "В данный момент ничего не играет",
    // VideoCard
    watch: "Смотреть в чате",
    // ChannelHeader
    video: "Видео",
    posts: "Посты",
    upNext: "Playlist",
    settings: "Настройки",
    // VideoPlayer & VideoStatus
    paused: "Приостановлено",
    startingIn: "Начиная с",
    play: "Воспроизвести",
    pause: "Пауза",
    mute: "Убрать звук",
    unmute: "Включить звук",
    fullScreen: "Полный экран",
    playing: "Играет",
    // ChatHeader & ChatActions
    roomMembers: "Участники чата",
    followers: "Подписчики",
    chatInput: "Введите текст...",
    // SortableList
    findMoreVideos: "Поиск видео",
    manageUpNext: "Создай видео дольше",
    upNextSubtitle:
      "Добавляйте, удаляйте или меняйте порядок видео.  Вы можете добавить до 30 видео.",
    searchAddVideos: "Находите и добавляйте больше видео ниже",
    //ChannelDescription & NewChannelPost & ChannelPost & ChannelChat
    admins: "Админы",
    postInput: "Добавить пост...",
    like: "Нравится",
    likes: "Понравившиеся",
    comment: "Комментировать",
    comments: "Комментарии",
    channelWelcomePost:
      "Это начало. Создай свой канал и наслаждайся просмотром вместе с друзьями.",
    //CreateChannel > ChannelForm, ChannelFormSubmit
    selectChannelIcon: "Выбрать значок канала",
    changeChannelIcon: "Изменить значок канала",
    createChannelName: "Название канала *",
    channelNameInput: "Назови свой канал",
    createChannelDesc: "Создать свой канал *",
    channelDescInput: "Описание канала",
    channelCatagory: "Категории канала (необязательно)",
    readyToCreate: "Готов создать свой канал?",
    saveChannelEdit: "Сохранить изменения",
    // ChannelSettingsPanel
    channelSettings: "Настройки канала",
    manageFollowers: "Управление подписчиками",
    manageAdmins: "Управление админами",
    manageBannedUsers: "Управление над заблокированные пользователями",
    deleteChannel: "Удалить канал"
    // // ContainerHeader
    // friendRequestHeader: "친구 추가",
    // notificationHeader: "알림",
    // settingsHeader: "설정",
    // accountSettings: "계정 설정",
    // blockedUsers: "차단 목록",
    // logOut: "로그아웃",
    // editUserInformation: "내 정보 변경",
    // changePassword: "비밀번호 변경",
    // // InfoCardList
    // nothingToShow: "항목이 비었습니다."
  }
});

export default strings;
