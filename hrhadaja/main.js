// ---- Lightweight YouTube facade: show thumbnail, load player only on click ----
document.querySelectorAll(".card").forEach((card) => {
  const id = card.dataset.yt;
  const thumb = card.querySelector(".thumb");
  // real preview image from YouTube
  thumb.style.backgroundImage =
    `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;

  thumb.addEventListener("click", () => {
    if (thumb.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src =
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    f.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true;
    thumb.appendChild(f);
  });
});

// ---- Reveal cards on scroll ----
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".card").forEach((c, i) => {
  c.style.transitionDelay = `${(i % 2) * 0.1}s`;
  io.observe(c);
});

// ---- Count-up stats ----
const countEls = document.querySelectorAll(".num");
const counted = new WeakSet();
const cio = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting || counted.has(e.target)) return;
    counted.add(e.target);
    const target = +e.target.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.round(target / 28));
    const tick = setInterval(() => {
      n = Math.min(target, n + step);
      e.target.textContent = n;
      if (n >= target) clearInterval(tick);
    }, 35);
  });
});
countEls.forEach((el) => cio.observe(el));
