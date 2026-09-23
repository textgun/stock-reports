// 기업분석 리포트 공용 화면 틀 — topbar 버튼을 그린다 (Pages의 assets/report_ui.js로 배포)
//
// 리포트 HTML은 생성 시점에 구워지는 정적 파일이라, 버튼을 HTML에 넣으면 바꿀 때마다 전 리포트를
// 다시 만들거나 파일별로 고쳐야 했다(2026-09-24 하루에 두 번). 리포트에는 자리만 두고
//   <span id="reportActions" data-ticker="005930" style="display:contents"></span>
// 버튼은 이 파일이 그린다 — 여기만 고쳐서 push하면 전 리포트에 반영된다(Pages 캐시 10분).
//
// ⚠️ 리포트 **내용**(점수·재무·차트)은 넣지 말 것. 그건 생성일 기준 데이터라 리포트에 굽는다.
//    여기에는 날짜와 무관한 이동·링크만 둔다.
// ⚠️ 절대 경로를 쓴다 — 리포트는 Pages의 reports/{종목}/ 아래라 상대 깊이가 로컬과 다르다.
(function () {
  var HOME = 'https://textgun.github.io/stock-reports/';
  var BTN = 'background:#232733;border:1px solid #363b46;color:#e2e8f0;border-radius:6px;' +
            'padding:5px 12px;font-size:12px;font-weight:600;text-decoration:none;white-space:nowrap';

  function link(href, text) {
    var a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.cssText = BTN;
    a.textContent = text;
    return a;
  }

  function render() {
    var box = document.getElementById('reportActions');
    if (!box || box.getAttribute('data-rendered')) return;
    var code = box.getAttribute('data-ticker');
    if (!code) return;
    // 📈 차트보기 — KR 스크리너 종목 차트 모달(하루 3번 갱신되는 최신 일봉·재무·컨센서스)
    box.appendChild(link(HOME + 'kr_heatmap.html?code=' + encodeURIComponent(code),
                         '📈 차트보기'));
    box.setAttribute('data-rendered', '1');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
