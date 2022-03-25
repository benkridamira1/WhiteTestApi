function getUser(id) {

    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('User is founded');
            let user = {id: id,gitHubUsername : 'username'};
           resolve(user);
        }, 2000);
    });
        
    }
    
    
    function getRepositories(username, level) {
    
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('repos is ready');
                let repos = ['br1','main','master'];
                resolve(repos,level);
            }, 2000);
        });
       
    }
    
    function getBrunch(repo, callback) {
    
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('repo[] is ready');    
                
                if(repo=="master")
                         resolve(repo);   
                reject("not found")           
            }, 2000);
        });
        
    }
    
    function postCommit(vers) {
    
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('new Version');
                resolve(vers == 'new Version');
            }, 2000);
        });
      
    }
    
    function commit(bool){
        setTimeout(() => {
            if (bool) {
                console.log("The new version is commited");
                        }
            else console.log("The new version is not commited");
        }, 2000);
        
    
    }
     getUser(1).then(user=>getRepositories(user.gitHubUsername,2))
                            .then((repo,level)=>getBrunch(repo[2]).then(brunch=> postCommit('new Version')))
                             .then(bool=>commit(bool))
    