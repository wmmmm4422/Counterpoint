//google analytics write code

const GA_TRACKING_ID = "G-75C0QLP4YH";

export default function gaEvent(action, category, label, value = 0) {
  try {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (e) {
    console.log(e);
  }
}

export function pageView(url) {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
}
