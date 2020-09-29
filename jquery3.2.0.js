const INTERSTITIAL_ID = '369582287540626_369587827540072';
const REWARDED_ID = '369582287540626_384770276021827';

const TIMER = 60000;

var preloadedInterstitial;
var preloadedRewardedVideo;
var timerDone = true;

// Load Interstitial
function LoadInter() {
    var supportedAPIs = FBInstant.getSupportedAPIs();
    if (supportedAPIs.includes('getInterstitialAdAsync')) {
        preloadedInterstitial = null;
        // Preload Interstitial
        FBInstant.getInterstitialAdAsync(INTERSTITIAL_ID)
            .then(function (interstitial) {
                // Load the Ad asynchronously
                preloadedInterstitial = interstitial;
                return preloadedInterstitial.loadAsync();
            })
            .then(function () {
                // FBLog("interloaded");
                console.log('Interstitial preloaded');
            })
            .catch(function (err) {
                console.error('Interstitial failed to preload: ' + err.message);
            });
    } else {
        console.error('Ads not supported in this session');
    }
}
// Show Interstitial
function ShowInter() {
    // if (timerDone) {
    // console.log('Interstitial');
    // adsTimer();
    if (!preloadedInterstitial) {
        LoadInter();
    } else {
        preloadedInterstitial
            .showAsync()
            .then(function () {
                // Perform post-ad success operation
                console.log('Interstitial ad finished successfully');
                LoadInter();
                // adsTimer();
            })
            .catch(function (e) {
                console.error(e.message);
            });
    }
    // }
}

// Load Rewarded
function LoadRewarded() {
    var supportedAPIs = FBInstant.getSupportedAPIs();
    if (
        supportedAPIs.includes('getInterstitialAdAsync') &&
        supportedAPIs.includes('getRewardedVideoAsync')
    ) {
        preloadedRewardedVideo = null;
        // Preload Rewarded
        FBInstant.getRewardedVideoAsync(REWARDED_ID)
            .then(function (rewarded) {
                // Load the Ad asynchronously
                preloadedRewardedVideo = rewarded;
                return preloadedRewardedVideo.loadAsync();
            })
            .then(function () {
                console.log('Rewarded Video preloaded');
            })
            .catch(function (err) {
                console.error('Rewarded Video failed to preload: ' + err.message);
            });
    }
}
// Show Rewarded
function ShowRewarded() {
    //console.log("Rewarded");
    if (!preloadedRewardedVideo) {
        LoadRewarded();
    } else {
        preloadedRewardedVideo
            .showAsync()
            .then(function () {
                console.log('Rewarded Video watched successfully');
                LoadRewarded();
            })
            .catch(function (e) {
                console.error(e.message);
            });
    }
}

function adsTimer() {
    timerDone = false;
    setTimeout(function () {
        timerDone = true;
    }, TIMER);
}

