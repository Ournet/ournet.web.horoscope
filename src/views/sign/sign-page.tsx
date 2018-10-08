
import * as React from 'react';
import CommonLayout from '../common-layout';
import PageTitle from '../components/page-title';
import { Share } from '../components/share';
import HoroscopeDayReport from '../components/horoscope/day-report';
import { SignViewModel } from '../../view-models/sign-view-model';
import addBottom from '../components/add-bottom';

export default class SignPage extends React.Component<SignViewModel> {
    render() {
        const { lang, country, head, __, config, title, subTitle, report, currentDayPeriodText } = this.props;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='u-report-margin'>
                        <Share services={config.shareServices} align='right' url={head.canonical} lang={lang} />
                        <PageTitle title={title || head.title} subTitle={subTitle || head.description} />
                    </div>
                    <HoroscopeDayReport root={this.props} report={report} date={currentDayPeriodText} footer={true} />
                    <div className='u-report-margin'>
                        <br />
                        {addBottom()}
                        <br />
                        <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%"></div>
                        <br />
                        {addBottom()}
                    </div>
                </main>
                {config.oneSignal &&
                    <div>
                        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
                        <script dangerouslySetInnerHTML={{
                            __html: `var OneSignal = window.OneSignal || [];

OneSignal.push(['init', {
    appId: "${config.oneSignal.appId}",
    autoRegister: false,
    persistNotification: false,
    notifyButton: {
    enable: true,
    showCredit: false,
    prenotify: true
    },
    welcomeNotification: {
    disable: true
    },
    safari_web_id: "${config.oneSignal.safari_web_id}"
}]);

OneSignal.push(function() {

    var category='notifications-horo';
    
    function initNotifications(permission) {
        var currentTags;
        var signId = '${report.sign}';

    function subscribedToCurrentSign() {
        return currentTags && currentTags['zodiac-sign'] == signId;
    }

    function setTags() {
        OneSignal.sendTags({'zodiac-sign': signId});
    }

    function subscribeToNotifications() {
        OneSignal.registerForPushNotifications();
        ga('send', 'event', category, 'show-register-native');
    }

    function hideSubscribe() {
        $('.c-subscribe-bar').addClass('hidden');
    }
    function showSubscribe() {
        $('.c-subscribe-bar').removeClass('hidden');
    }

    if(permission === 'granted') {
        OneSignal.getTags(function(tags) {
        currentTags = tags;
        if (!subscribedToCurrentSign()) {
            showSubscribe();
        }
        });
    } else {
        showSubscribe();
        setTimeout(subscribeToNotifications, 1000*5);
    }
    
    $('.c-subscribe-bar').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        ga('send', 'event', category, 'click-subscribe-btn');
        if(permission === 'granted') {
            setTags();
            ga('send', 'event', category, 'changed-sign', signId);
            hideSubscribe();
        } else {
            subscribeToNotifications();
        }
    });


    OneSignal.on('notificationPermissionChange', function(permissionChange) {
        var currentPermission = permissionChange.to;
        if (currentPermission === 'granted') {
            setTags();
        }
        ga('send', 'event', category, currentPermission);
    });
    // Occurs when the user's subscription changes to a new value.
    OneSignal.on('subscriptionChange', function (isSubscribed) {
        if (isSubscribed) {
            hideSubscribe();
            setTags();
        } else {
            showSubscribe();
        }
    });

    }

    // If we're on an unsupported browser, do nothing
    if (OneSignal.isPushNotificationsSupported()) {
        OneSignal.push(["getNotificationPermission", function(permission) {
            initNotifications(permission);
        }]);
        ga('send', 'event', category, 'supported');
    } else {
        hideSubscribe();
        ga('send', 'event', category, 'not-supported');
    }
});`}}></script>
                    </div>}
                <script dangerouslySetInnerHTML={{
                    __html: `(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/${lang + '_' + country.toUpperCase()}/sdk.js#xfbml=1&version=v2.6&appId=${config.facebookId}";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));`}}></script>
            </CommonLayout>
        )
    }
}
