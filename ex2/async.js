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
                         resolve(repo);          
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

    async function exec(){
        let user= await getUser();
        let repo = await getRepositories(user.gitHubUsername, 2);
     

        let level=await getRepositories(user.gitHubUsername, 2).level;
        let brunch= await getBrunch(repo[2]);
        if(brunch == "master"){
            let postcommit= await postCommit('new Version');
            let bool= await commit( postcommit);}
        

        }
        exec()


  
    
    //  getUser(1).then(user=>getRepositories(user.gitHubUsername,2))
    //                         .then((repo,level)=>getBrunch(repo[level]).then(brunch=> postCommit('new Version')))
    //                          .then(bool=>commit(bool))
    