export function setMeta({title, description, theme}){
  if(title) document.title = title;
  const desc = document.querySelector('meta[name="description"]');
  if(desc && description) desc.setAttribute('content', description);
  document.body.className = document.body.className.replace(/theme-\w+/g,'').trim();
  if(theme) document.body.classList.add(`theme-${theme}`);
}
