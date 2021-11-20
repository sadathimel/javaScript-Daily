const links = [
    {name: 'Facebook', url: 'https://facebook.com'},
    {name: 'Yourtube', url: 'https://yourtube.com'},
    {name: 'Instagram', url: 'https://instagram.com'},
    {name: 'Linkedin', url: 'https://linkedin.com'},
    {name: 'Twitter', url: 'https://twitter.com'},
];

let template = `<ul>{{links}}</ul>`;

const linkList = links.reduce((acc,cur)=>{
    acc += `<li><a href="${cur.url}">${cur.name}</a></li>`;
    return acc;
},'');

temp = template.replace('{{links}}', linkList);

console.log(temp);