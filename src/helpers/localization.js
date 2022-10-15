import LocalizedStrings from "react-localization";

// To add more supported languages, add the Country Key (eg.English -> en). Keys can be found here https://material-ui.com/guides/localization/.
let strings = new LocalizedStrings({
  //  Default - English  //
  en: {
    // SEO (MataData & WelcomePage & SiteHeaderWelcome)
    mainTitle: "Something - Watch",
    mainDescription: "bla bla bla!",
    mainKeywords: "bla bla bla",
    loginPageTitle: "Something - Log In or Sign Up",
    loginPageDescription: "bla bla bla!",
    createChannelTitle: "Create Channel - Something",
    createChannelDescription: "bla bla bla!",
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
    ageLimitText: "You can't use ABC if you are younger than 13.",
    invalidEmail: "Invalid email *",
    passwordTooShort: "At least 6 characters needed *",
    passwordTooLong: "Maximum 32 characters *",
    lowerCaseRequired: "At least one lowercase letter needed *",
    upperCaseRequired: "At least one uppercase letter needed *",
    numberRequired: "Password should have at least one number.",
    newPasswordRequirement: "It must be different from your old password.",
    // Footer
    company: "Company",
    aboutSomething: "About Something",
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
    sendFeedbackButton: "About Something",
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
    upNextSubtitle: "Add, delete or change the orders of the videos. You can add up to 30 videos.",
    searchAddVideos: "Search and add more videos below!",
    //ChannelDescription & NewChannelPost & ChannelPost
    admins: "Admins",
    postInput: "Post something...",
    like: "Like",
    likes: "Likes",
    comment: "Comment",
    comments: "Comments",
    channelWelcomePost: "Welcome!",
    deletePost: "Delete post",
    deletePostSubtitle: "Are you sure you want to delete this Post? You cannot undo this action.",
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
    deleteChannelSubtitle: "Are you sure you want to delete your channel? You cannot undo this action.",
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
  }
});

export default strings;
