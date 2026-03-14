// TODO: create some sort of build system to compile this file

/*
// whenever user clicks on element with data-goto attribute, scroll to that message
document.addEventListener('click', (e) => {
  const target = e.target;
  if(!target) return;

  const goto = target?.getAttribute('data-goto');

  if (goto) {
    const message = document.getElementById(`m-\${goto}`);
    if (message) {
      message.scrollIntoView({ behavior: 'smooth', block: 'center' });
      message.style.backgroundColor = 'rgba(148, 156, 247, 0.1)';
      message.style.transition = 'background-color 0.5s ease';
      setTimeout(() => {
        message.style.backgroundColor = 'transparent';
      }, 1000);
    } else {
      console.warn(`Message \${goto} not found.`);
    }
  }
});
*/
export const scrollToMessage =
  'document.addEventListener("click",t=>{let e=t.target;if(!e)return;let o=e?.getAttribute("data-goto");if(o){let r=document.getElementById(`m-${o}`);r?(r.scrollIntoView({behavior:"smooth",block:"center"}),r.style.backgroundColor="rgba(148, 156, 247, 0.1)",r.style.transition="background-color 0.5s ease",setTimeout(()=>{r.style.backgroundColor="transparent"},1e3)):console.warn("Message ${goto} not found.")}});';

export const revealSpoiler =
  'const s=document.querySelectorAll(".discord-spoiler");s.forEach(s=>s.addEventListener("click",()=>{if(s.classList.contains("discord-spoiler")){s.classList.remove("discord-spoiler");s.classList.add("discord-spoiler--revealed");}}));';

// Profile popup: creates popup element and handles click-to-show on .dc-user-mention spans
export const profilePopup =
  '(function(){var p=document.createElement(\'div\');p.id=\'dc-profile-popup\';p.className=\'dc-profile-card\';p.innerHTML=\'<div class="dc-profile-banner"></div><div class="dc-profile-body"><div class="dc-profile-avatar-wrap"><img class="dc-profile-avatar" src="" alt=""/></div><div class="dc-profile-name-row"><span class="dc-profile-display-name"></span><span class="dc-profile-bot-badge" style="display:none">BOT</span></div><div class="dc-profile-username"></div><div class="dc-profile-divider"></div><div class="dc-profile-roles-section" style="display:none"><div class="dc-profile-section-label">ROLES</div><span class="dc-role-tag"><span class="dc-role-dot"></span><span class="dc-role-name"></span></span></div></div>\';document.body.appendChild(p);document.addEventListener(\'click\',function(e){var m=e.target.closest(\'.dc-user-mention\');if(m){e.stopPropagation();var uid=m.dataset.userId;var pr=((window.$discordMessage||{}).profiles||{})[uid];if(!pr)return;var b=p.querySelector(\'.dc-profile-banner\');if(pr.banner){b.style.backgroundImage=\'url(\'+pr.banner+\')\';b.style.backgroundColor=\'\';}else{b.style.backgroundImage=\'\';b.style.backgroundColor=(pr.bannerColor||(pr.roleColor&&pr.roleColor!==\'#000000\'?pr.roleColor:\'#5865f2\'));}p.querySelector(\'.dc-profile-avatar\').src=pr.avatar||\'\';p.querySelector(\'.dc-profile-display-name\').textContent=pr.author||\'\';p.querySelector(\'.dc-profile-username\').textContent=pr.username?(\'@\'+pr.username):\'\';p.querySelector(\'.dc-profile-bot-badge\').style.display=pr.bot?\'inline-flex\':\'none\';var rs=p.querySelector(\'.dc-profile-roles-section\');if(pr.roleName){rs.style.display=\'\';p.querySelector(\'.dc-role-dot\').style.background=pr.roleColor||\'#99aab5\';p.querySelector(\'.dc-role-name\').textContent=pr.roleName;}else{rs.style.display=\'none\';}p.style.display=\'block\';var r=m.getBoundingClientRect();var t=r.bottom+window.scrollY+8;var l=r.left+window.scrollX;var pw=300;var ph=p.offsetHeight;if(l+pw>window.innerWidth-8)l=window.innerWidth-pw-8;if(l<8)l=8;if(t+ph>window.scrollY+window.innerHeight-8)t=r.top+window.scrollY-ph-8;p.style.top=t+\'px\';p.style.left=l+\'px\';return;}if(!p.contains(e.target)){p.style.display=\'none\';}});})();';
