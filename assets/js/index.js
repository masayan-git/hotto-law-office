document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const headerButton = document.querySelector(".header__button");
  const spNav = document.querySelector('[aria-label="sp-nav"]');

  if (headerButton && header && spNav) {
    headerButton.addEventListener("click", () => {
      header.classList.toggle("header--active");
    });
    spNav.querySelectorAll("a").forEach((node) => {
      node.addEventListener("click", () => {
        header.classList.remove("header--active");
      });
    });

    const spHeaderAccordionButton = document.querySelector("[data-sp-header-accordion]");

    spHeaderAccordionButton.addEventListener("click", () => {
      spHeaderAccordionButton.classList.toggle("active");
    });

    const dataHeaderMenuAccordionButton = document.querySelector("[data-header-menu-accordion-button]");

    dataHeaderMenuAccordionButton.addEventListener("click", () => {
      dataHeaderMenuAccordionButton.classList.toggle("active");
    });
  }

  // アコーディオン
  const accordionButtons = document.querySelectorAll(".faq__accordion-button");
  if (accordionButtons) {
    accordionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        const panelId = button.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);

        button.setAttribute("aria-expanded", String(!expanded));

        if (!expanded) {
          panel.hidden = false;
          // 次のフレームでクラスを追加してアニメーションを有効化
          requestAnimationFrame(() => {
            panel.classList.add("is-open");
          });
        } else {
          panel.classList.remove("is-open");
          panel.addEventListener(
            "transitionend",
            () => {
              if (!panel.classList.contains("is-open")) {
                panel.hidden = true;
              }
            },
            { once: true }
          );
        }
      });
    });
  }

  // lineボタン
  const lineButtons = document.querySelectorAll('[aria-label="line"]');
  if (lineButtons) {
    lineButtons.forEach((button) => {
      button.addEventListener("click", () => {
        alert("こちらは架空サイトのLINEお問い合わせボタンです。実際のLINEアカウントには接続されていません。");
      });
    });
  }

  // フォーム送信ボタンを押したら完了画面へ遷移させる
  const contactForm = document.querySelector(".contact__form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "./contact-complete.html";
    });
  }

  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 10%見えたら発火
    }
  );

  fadeEls.forEach((el) => observer.observe(el));
});
