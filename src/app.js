import './sub';
import './app.scss';
// import 'regenerator-runtime'; //ここは babel.config.js useBuildInsで指定するほうがよい
// import 'core-js'; //このコメントアウトのimportはES6以前用

const init = async () => {
    console.log('this is a main js file.');
    await asyncFn();
    g = 0;
};
init();

async function asyncFn() {
    console.log("this is async function");
    console.log([1,2,3].includes(0));
}