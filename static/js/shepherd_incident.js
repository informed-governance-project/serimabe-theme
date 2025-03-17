import Shepherd from 'https://cdn.jsdelivr.net/npm/shepherd.js@latest/dist/esm/shepherd.mjs';

$(document).ready(function () {

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      scrollTo: true,
      cancelIcon: {
        enabled: true
      }
    },
    steps: [
      {
        id: 'welcome',
        text: [
          `
          This guide will help you create an incident notification.
          You can stop at any time.
          `
        ],
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            classes: 'btn btn-secondary shepherd-button-secondary',
            text: 'Exit',
            action: () => tour.cancel(),
          },
          {
            type: 'next',
            classes: 'btn btn-primary',
            text: 'Next',
            action: () => {
              localStorage.setItem('currentStep', 'step_1');
              tour.next();
            },
          }
        ]
      },
      {
        id: 'step_1',
        text: gettext("Click here to start"),
        attachTo: {
          element: '#notifyIncidentBtn',
          on: 'auto'
        },
        advanceOn: { selector: '#notifyIncidentBtn', event: 'click' },
        when: {
          "before-hide": () => {
            localStorage.setItem('currentStep', 'step_2');
            tour.hide()
          }
        },
      },
      {
        id: 'step_2',
        text: 'Enter operator name if it does not exist',
        attachTo: {
          element: 'form .card-body > div:nth-child(2)',
          on: 'auto'
        },
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_3');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_3',
        text: 'Verify and enter the missing incident notification manager information',
        attachTo: {
          element: 'form .card-body > div:nth-child(3)',
          on: 'auto'
        },
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_4');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_4',
        text: 'Click if the incident notification manager is also the technical contact',
        attachTo: {
          element: 'form .form-switch',
          on: 'auto'
        },
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_5');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_5',
        text: 'Verify and enter the missing tehcnical information',
        attachTo: {
          element: 'form .card-body > div:nth-child(4)',
          on: 'auto'
        },
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_6');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_6',
        text: 'Enter incident references if any ',
        attachTo: {
          element: 'form .card-body > div:nth-child(5)',
          on: 'auto'
        },
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_7');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_7',
        text: gettext("Click here to continue"),
        attachTo: {
          element: 'form .notification-buttons > div:nth-child(2)',
          on: 'auto'
        },
        advanceOn: { selector: 'form .notification-buttons > div:nth-child(2) > button', event: 'click' },
        when: {
          "before-hide": () => {
            localStorage.setItem('currentStep', 'step_8');
            tour.hide()
          }
        }
      },
      {
        id: 'step_8',
        text: 'Select the regulator(s) to send the incident notification',
        attachTo: {
          element: 'form .card-body > div:nth-of-type(1)',
          on: 'top'
        },
        extraHighlights: [
          'form .card-body > div:nth-of-type(2)',          
        ],
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_9');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_9',
        text: gettext("Click here to continue"),
        attachTo: {
          element: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2) ',
          on: 'auto'
        },
        advanceOn: { selector: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2)', event: 'click' },
        when: {
          "before-hide": () => {
            localStorage.setItem('currentStep', 'step_10');
            tour.hide()
          }
        }
      },
      {
        id: 'step_10',
        text: 'Select the legal basis linked to incident notification',
        attachTo: {
          element: 'form .card-body > div:nth-of-type(1)',
          on: 'top'
        },
        extraHighlights: [
          'form .card-body > div:nth-of-type(2)',          
        ],
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_11');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_11',
        text: gettext("Click here to continue"),
        attachTo: {
          element: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2) ',
          on: 'auto'
        },
        advanceOn: { selector: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2)', event: 'click' },
        when: {
          "before-hide": () => {
            localStorage.setItem('currentStep', 'step_12');
            tour.hide()
          }
        }
      },
      {
        id: 'step_12',
        text: 'Select the sectors linked to incident notification',
        attachTo: {
          element: 'form .card-body > div:nth-of-type(1)',
          on: 'top'
        },
        extraHighlights: [
          'form .card-body > div:nth-of-type(2)',          
        ],
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_13');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_13',
        text: gettext("Click here to continue"),
        attachTo: {
          element: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2) ',
          on: 'auto'
        },
        advanceOn: { selector: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2)', event: 'click' },
        when: {
          "before-hide": () => {
            localStorage.setItem('currentStep', 'step_14');
            tour.hide()
          }
        }
      },
      {
        id: 'step_14',
        text: 'Enter incident notification detation date',
        attachTo: {
          element: 'form .card-body > div:nth-of-type(1)',
          on: 'top'
        },
        extraHighlights: [
          'form .card-body > div:nth-of-type(2)',          
        ],
        buttons: [
          {
            text: 'Next',
            classes: 'btn btn-primary',
            action: () => {
              localStorage.setItem('currentStep', 'step_15');
              tour.next();
            },
          }
        ],
      },
      {
        id: 'step_15',
        text: gettext("Click here to notify"),
        attachTo: {
          element: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2) ',
          on: 'auto'
        },
        advanceOn: { selector: 'form .notification-buttons > div:nth-child(2) > button:nth-of-type(2)', event: 'click' },
        when: {
          "before-hide": () => {
            tour.complete()
          }
        }
      },
    ]
  });

  const savedStep = localStorage.getItem('currentStep');

  if (savedStep) {
    tour.start();
    const stepIndex = tour.steps.findIndex(step => step.id === savedStep);
    if (stepIndex !== -1) {
      tour.show(stepIndex);
    } else {
      tour.cancel();
    }
  }

  ['complete', 'cancel'].forEach((event) =>
    tour.on(event, () => {
      localStorage.removeItem("currentStep")
    })
  );

  $(document).on("click", '#help_button', function () {
    tour.start();
  });
});

