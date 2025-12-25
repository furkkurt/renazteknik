const u="renaz_comments";function f(){if(typeof window>"u")return[];const e=localStorage.getItem(u);return e?JSON.parse(e):[]}function p(e){typeof window>"u"||localStorage.setItem(u,JSON.stringify(e))}function y(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}function x(e){return new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}function g(e,t=!1){const n=e.name||"İsimsiz";let l=`
			<div class="comment-item ${t?"reply-item pl-6":""} bg-white p-6 rounded-lg shadow-md mb-4">
				<div class="flex justify-between items-start mb-3">
					<div>
						<h3 class="text-lg font-bold text-[#000000]" style="font-family: 'Roboto Condensed', sans-serif;">
							${n}
						</h3>
						<p class="text-sm text-gray-600" style="font-family: 'Roboto Condensed', sans-serif;">
							${e.service}
						</p>
					</div>
					<span class="text-sm text-gray-500" style="font-family: 'Roboto Condensed', sans-serif;">
						${x(e.date)}
					</span>
				</div>
				<p class="text-[#000000] leading-relaxed mb-3" style="font-family: 'Roboto Condensed', sans-serif;">
					${e.comment.replace(/\n/g,"<br>")}
				</p>
				${t?"":`
					<button
						onclick="showReplyForm('${e.id}')"
						class="text-sm text-[#fad000] hover:text-[#e6c200] font-medium"
						style="font-family: 'Roboto Condensed', sans-serif;"
					>
						Yanıtla
					</button>
					<div id="reply-form-${e.id}" class="hidden mt-4 pt-4 border-t border-gray-200">
						<form onsubmit="handleReply(event, '${e.id}')" class="space-y-3">
							<input
								type="text"
								id="reply-name-${e.id}"
								placeholder="İsim (İsteğe Bağlı)"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fad000] focus:border-[#fad000] outline-none text-sm"
							/>
							<textarea
								id="reply-comment-${e.id}"
								required
								rows="3"
								placeholder="Yanıtınızı yazın..."
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fad000] focus:border-[#fad000] outline-none resize-none text-sm"
							></textarea>
							<div class="flex space-x-2">
								<button
									type="submit"
									class="bg-[#fad000] text-[#000000] font-bold py-2 px-4 rounded-lg hover:bg-[#e6c200] transition-colors duration-200 text-sm uppercase"
									style="font-family: 'Roboto Condensed', sans-serif;"
								>
									Gönder
								</button>
								<button
									type="button"
									onclick="hideReplyForm('${e.id}')"
									class="bg-gray-200 text-[#000000] font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
									style="font-family: 'Roboto Condensed', sans-serif;"
								>
									İptal
								</button>
							</div>
						</form>
					</div>
				`}
			</div>
		`;return e.replies&&e.replies.length>0&&(l+=e.replies.map(i=>g(i,!0)).join("")),l}function m(e=1){const t=f(),n=document.getElementById("comments-container"),o=document.getElementById("pagination-container");if(!n)return;const l=[...t].sort((r,s)=>new Date(s.date).getTime()-new Date(r.date).getTime()),i=Math.ceil(l.length/20),a=(e-1)*20,d=a+20,c=l.slice(a,d);if(c.length===0){n.innerHTML=`
				<div class="bg-white p-8 rounded-lg shadow-md">
					<p class="text-lg text-[#000000] text-center" style="font-family: 'Roboto Condensed', sans-serif;">
						Henüz yorum yapılmamış. İlk yorumu siz yapın!
					</p>
				</div>
			`,o&&o.classList.add("hidden");return}if(n.innerHTML=c.map(r=>g(r)).join(""),i>1&&o){o.classList.remove("hidden");let r="";e>1&&(r+=`
					<button
						onclick="displayComments(${e-1})"
						class="px-4 py-2 bg-[#fad000] text-[#000000] font-bold rounded-lg hover:bg-[#e6c200] transition-colors duration-200"
						style="font-family: 'Roboto Condensed', sans-serif;"
					>
						Önceki
					</button>
				`);for(let s=1;s<=i;s++)s===e?r+=`
						<span class="px-4 py-2 bg-[#000000] text-[#fad000] font-bold rounded-lg" style="font-family: 'Roboto Condensed', sans-serif;">
							${s}
						</span>
					`:s===1||s===i||s>=e-2&&s<=e+2?r+=`
						<button
							onclick="displayComments(${s})"
							class="px-4 py-2 bg-gray-200 text-[#000000] font-bold rounded-lg hover:bg-gray-300 transition-colors duration-200"
							style="font-family: 'Roboto Condensed', sans-serif;"
						>
							${s}
						</button>
					`:(s===e-3||s===e+3)&&(r+='<span class="px-2">...</span>');e<i&&(r+=`
					<button
						onclick="displayComments(${e+1})"
						class="px-4 py-2 bg-[#fad000] text-[#000000] font-bold rounded-lg hover:bg-[#e6c200] transition-colors duration-200"
						style="font-family: 'Roboto Condensed', sans-serif;"
					>
						Sonraki
					</button>
				`),o.innerHTML=r}else o&&o.classList.add("hidden")}function h(e){e.preventDefault();const t=e.target,n=new FormData(t),o=n.get("name")?.trim()||null,l=n.get("service"),i=n.get("comment")?.trim();if(!l||!i){alert("Lütfen tüm gerekli alanları doldurun.");return}const a={id:y(),name:o,service:l,comment:i,date:new Date().toISOString(),replies:[]},d=f();d.push(a),p(d),t.reset(),m(1);const c=document.getElementById("comments-container");c&&c.scrollIntoView({behavior:"smooth",block:"start"})}function v(e,t){e.preventDefault();const n=e.target,o=document.getElementById(`reply-name-${t}`),l=document.getElementById(`reply-comment-${t}`),i=o.value.trim()||null,a=l.value.trim();if(!a){alert("Lütfen yanıtınızı yazın.");return}const d={id:y(),name:i,service:"Yanıt",comment:a,date:new Date().toISOString(),replies:[]},c=f(),r=c.find(s=>s.id===t);r&&(r.replies||(r.replies=[]),r.replies.push(d),p(c),n.reset(),b(t),m(1))}function E(e){const t=document.getElementById(`reply-form-${e}`);t&&t.classList.remove("hidden")}function b(e){const t=document.getElementById(`reply-form-${e}`);if(t){t.classList.add("hidden");const n=document.getElementById(`reply-name-${e}`),o=document.getElementById(`reply-comment-${e}`);n&&(n.value=""),o&&(o.value="")}}window.displayComments=m;window.handleReply=v;window.showReplyForm=E;window.hideReplyForm=b;function C(){const e=document.querySelectorAll(".parallax-bg");if(e.length===0)return;function t(){const l=window.pageYOffset||window.scrollY||document.documentElement.scrollTop,i=.25;e.forEach(a=>{const d=a;if(!d.closest(".tiled-background-wrapper"))return;const w=l*i%200;d.style.backgroundPosition=`0 ${w}px`})}let n=!1;function o(){n||(window.requestAnimationFrame(()=>{t(),n=!1}),n=!0)}return t(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",t),()=>{window.removeEventListener("scroll",o),window.removeEventListener("resize",t)}}document.addEventListener("DOMContentLoaded",()=>{C();const e=document.getElementById("comment-form");e&&e.addEventListener("submit",h),m(1)});
