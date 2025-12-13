import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

const CookieConsentComponent: React.FC = () => {
    useEffect(() => {
        CookieConsent.run({
            categories: {
                necessary: {
                    enabled: true,  // this category is enabled by default
                    readOnly: true  // this category cannot be disabled
                },
                functionality: {}
            },

            language: {
                default: 'en',
                translations: {
                    en: {
                        consentModal: {
                            title: 'We use cookies',
                            description: 'We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. Please choose your preferences.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage preferences'
                        },
                        preferencesModal: {
                            title: 'Manage cookie preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Save preferences',
                            closeIconLabel: 'Close modal',
                            sections: [
                                {
                                    title: 'Cookie Usage',
                                    description: 'We use cookies to improve your experience on our website. You can customize your preferences below.'
                                },
                                {
                                    title: 'Strictly Necessary Cookies',
                                    description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: 'Functionality Cookies',
                                    description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
                                    linkedCategory: 'functionality'
                                },
                                {
                                    title: 'More information',
                                    description: 'For any queries in relation to our policy on cookies and your choices, please <a href="#contact">contact us</a>.'
                                }
                            ]
                        }
                    }
                }
            }
        });
    }, []);

    return (
        <button
            type="button"
            data-cc="show-preferencesModal"
            className="fixed bottom-4 right-4 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors shadow-lg z-40"
        >
            Manage cookie preferences
        </button>
    );
};

export default CookieConsentComponent;
