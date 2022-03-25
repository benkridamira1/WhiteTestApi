getUser(1, (user) => {
    getRepositories(user.gitHubUsername, 2, (repos, levelNumber) => {
        getBrunch(repos[levelNumber], (brunch) => {
            if (brunch == "master")
                postCommit('new Version', (commited) => {
                    if (commited) console.log("The new version is commited");
                    else console.log("The new version is not commited");
                });
            });
    });
});

function getUser(id,callback) {
    setTimeout(() => {
        console.log('User is founded');
        let user = {id: id,gitHubUsername : 'username'};
        callback(user);
    }, 2000);
}

function getRepositories(username, level, callback) {
    setTimeout(() => {
        console.log('repos is ready');
        let repos = ['br1','main','master'];
        callback(repos,level);
    }, 2000);
}

function getBrunch(repo, callback) {
    setTimeout(() => {
        console.log('repo[] is ready');
        callback(repo);
    }, 2000);
}

function postCommit(vers, callback) {
    setTimeout(() => {
        console.log('new Version');
        callback(vers == 'new Version');
    }, 2000);
}