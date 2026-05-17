// ============================================
// Render Students from JSON
// ============================================

export async function renderStudents() {
  const container = document.getElementById('student-cards-container');
  const teacherContainer = document.getElementById('teacher-card-container');
  if (!container) return;

  try {
    const res = await fetch('./data/students.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    // Render teacher card
    if (teacherContainer && data.teacher) {
      const t = data.teacher;
      teacherContainer.innerHTML = `
        <div class="card teacher-card" data-aos="fade-up">
          <img src="${t.photo}" alt="${t.alt}" class="profile-pic" />
          <h3>${t.name}</h3>
          <p>${t.role}</p>
        </div>`;
    }

    // Render student cards
    if (data.students && data.students.length > 0) {
      let html = '';
      data.students.forEach((s, i) => {
        const filterAttr = s.greyscale ? ' style="filter: saturate(0);"' : '';
        const delay = Math.min(i * 40, 400);

        let detailsHtml = '';
        if (s.details && s.details.length) {
          detailsHtml = s.details.map(d =>
            `<p><strong>${d.label} :</strong> ${d.value}</p>`
          ).join('');
        }

        let socialsHtml = '';
        if (s.socials && s.socials.length) {
          socialsHtml = s.socials.map(link => {
            let iconClass = 'bx-images';
            if (link.type === 'instagram') iconClass = 'bxl-instagram';
            else if (link.type === 'tiktok') iconClass = 'bxl-tiktok';
            return `<a href="${link.url}" target="_blank"><i class="bx ${iconClass}"></i></a>`;
          }).join('');
        }

        html += `
          <div class="card" onclick="toggleDetails(this)"${filterAttr} data-aos="fade-up" data-aos-delay="${delay}">
            <img src="${s.photo}" alt="${s.alt}" class="profile-pic" />
            <h3>${s.name}</h3>
            <div class="details">
              ${detailsHtml}
              ${socialsHtml}
            </div>
          </div>`;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = '<p style="text-align:center; opacity:0.5; padding:2rem;">Tidak ada data siswa.</p>';
    }

    // Init VanillaTilt for 3D card effect
    if (window.VanillaTilt) {
      VanillaTilt.init(container.querySelectorAll('.card'), {
        max: 8, speed: 800, glare: true, 'max-glare': 0.15,
        perspective: 1000, scale: 1.02
      });
    }

    // Refresh AOS after dynamic content
    if (window.AOS) setTimeout(() => AOS.refresh(), 150);

  } catch (e) {
    console.error('Error loading students:', e);
    container.innerHTML = '<p style="text-align:center; color:#ff6b6b; padding:2rem;">Gagal memuat data siswa: ' + e.message + '</p>';
  }
}
