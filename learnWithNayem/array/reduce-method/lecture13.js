const js = {
    name: 'Javascript: All You Need to Know',
    author: {
        name: "HM Nayam",
        email: "hasan.m.nayem@gmail.com",
    },
    contents: {
        video: {
            count:222,
        },
    },
};

const node = {
    name: 'Dive ino NodeJs',
    author: {
        name: 'HM Nayem',
        email: 'hasan.m.nayem@gmail.com',
    },
    contents: {
        video: {
            count: 234,
        },
    },
}



const react = {
    name: 'Javascript:  Understend react advanced',
    author: {
        name: 'Hm Nayem',
        email: 'hasan.m.nayem@gamil.com',
    },
    contents: {
        video: {
            count: 125,
        },
        article: {
            count: 15,
        },
        quiz: {
            count: 10,
        },
    },
}

const inspectObj =  (obj,path)=>{
   
    return path.split('.').reduce((acc,field)=>{
        if (acc){
            return acc[field];
        }
        return 0;
    },obj);
}


const courses = [js,node, react];

courses.forEach((course)=>{
    const countVideo = inspectObj(course, 'contents.video.count');
    const countArticle = inspectObj(course, 'contents.article.count');
    const countQuiz = inspectObj(course, 'contents.quiz.count');

    console.log(
        `Total Video = ${countVideo}, Article= ${countArticle}, and Quiz=${countQuiz}`
    )
});