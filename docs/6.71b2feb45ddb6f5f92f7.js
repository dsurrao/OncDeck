(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"+vdp":function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var i=n("mrSG"),s=(n("DL2O"),n("ZZ/e"),n("8lHB")),r=n("Pbt4"),o=(n("ElRG"),n("7wfR"),n("dYYQ"),n("yOrE")),a=n("59dD"),u=(n("GTb5"),n("8GA0")),c=function(){function t(t,e,n,i,s,r,a,c,d,h,l){var p=this;this.navCtrl=t,this.loadingCtrl=e,this.modalCtrl=n,this.alertCtrl=i,this.patientSvc=s,this.patientListSvc=r,this.dbService=a,this.events=c,this.dateUtils=d,this.device=h,this.platform=l,this.patients=[],this.originalPatientList=[],this.isAuthenticated=!1,this.currentAuthenticatedUsername="",this.showOnlyMyPatients=!1,this.sortOrder="lastEditedDate",this.isLoading=!1,this.isSearchbarOpened=!1,this.ptFilter=u.a.All,this.isOnline=!1,this.infiniteScrollFlag=!1,this.surgeryStatusEnum=o.a,this.patientListFilterEnum=u.a,this.resetPaginationOptions(),this.events.subscribe("userLoggedIn",(function(){p.isAuthenticated=!0,p.dbService.getSessionUsername().then((function(t){p.currentAuthenticatedUsername=t})).catch((function(t){console.log("error retrieving session username: "+t)})),p.getPatients()})),this.events.subscribe("userLoggedOut",(function(){p.isAuthenticated=!1,p.currentAuthenticatedUsername="",p.patients=[]})),this.events.subscribe("patientSaved",(function(){p.getPatients()})),this.events.subscribe("syncActive",(function(){p.lastActiveSync=(new Date).toLocaleString(),p.getPatients()}))}return t.prototype.ngOnInit=function(){var t=this;this.isOnline=navigator.onLine,window.addEventListener("offline",(function(){t.isOnline=!1})),window.addEventListener("online",(function(){t.isOnline=!0}))},t.prototype.ngOnDestroy=function(){this.events.unsubscribe("userLoggedIn"),this.events.unsubscribe("userLoggedOut"),this.events.unsubscribe("patientSaved"),this.events.unsubscribe("syncActive")},t.prototype.ionViewDidEnter=function(){var t=this;this.dbService.getSession().then((function(e){""!=e.userCtx.name&&null!=e.userCtx.name?(t.isAuthenticated=!0,t.currentAuthenticatedUsername=e.userCtx.name,t.getPatients()):(t.isAuthenticated=!1,navigator.onLine?t.presentLoginModal():t.getPatients())})).catch((function(e){t.getPatients(),console.log(e)}))},t.prototype.login=function(){this.isAuthenticated?this.presentLogoutModal():this.presentLoginModal()},t.prototype.presentLoginModal=function(){return i.b(this,void 0,void 0,(function(){return i.e(this,(function(t){switch(t.label){case 0:return[4,this.modalCtrl.create({component:s.a})];case 1:return[4,t.sent().present()];case 2:return[2,t.sent()]}}))}))},t.prototype.presentLogoutModal=function(){return i.b(this,void 0,void 0,(function(){return i.e(this,(function(t){switch(t.label){case 0:return[4,this.modalCtrl.create({component:r.a})];case 1:return[4,t.sent().present()];case 2:return[2,t.sent()]}}))}))},t.prototype.resetPaginationOptions=function(){this.pageSize=10,this.skip=0,this.totalRows=-1,this.startKey=null,this.patients=[]},t.prototype.getPatients=function(){return i.b(this,void 0,void 0,(function(){var t,e=this;return i.e(this,(function(n){switch(n.label){case 0:return this.isLoading?[3,2]:(this.isLoading=!0,t=this,[4,this.loadingCtrl.create({message:"Loading patients..."})]);case 1:t.loading=n.sent(),this.loading.present().then((function(){e.loadMorePatients(null,e.infiniteScrollFlag)})),n.label=2;case 2:return[2]}}))}))},t.prototype.loadMorePatients=function(t,e){var n=this;void 0===t&&(t=null),void 0===e&&(e=!1);var i={};e&&(i={limit:this.pageSize,startkey:this.startKey,skip:this.skip}),this.showOnlyMyPatients&&(i.watchingProvider=this.currentAuthenticatedUsername),null==t&&this.resetPaginationOptions(),this.patientListSvc.getPatientsByFilter(this.ptFilter,i).then((function(e){n.isLoading=!1,null!=n.loading&&n.loading.dismiss(),null!=t&&t.target.complete(),e.patients.length>0&&(n.totalRows=e.totalRows,n.startKey=e.patients[e.patients.length-1]._id,n.skip=1,e.patients.forEach((function(t){t.isArchived||n.patients.push(t)})),n.originalPatientList=e.patients,n.displayPatientsBySortOrder())})).catch((function(t){n.isLoading=!1,null!=n.loading&&n.loading.dismiss(),console.log("get patients error",t)}))},t.prototype.showGraph=function(){},t.prototype.aboutPage=function(){},t.prototype.removePatientConfirm=function(t){return i.b(this,void 0,void 0,(function(){var e=this;return i.e(this,(function(n){switch(n.label){case 0:return[4,this.alertCtrl.create({header:"Remove patient?",message:"Are you sure you want to remove this patient?",buttons:[{text:"No",handler:function(){e.patientList.closeSlidingItems()}},{text:"Yes",handler:function(){e.removePatient(t)}}]})];case 1:return[4,n.sent().present()];case 2:return n.sent(),[2]}}))}))},t.prototype.removePatient=function(t){var e=this;this.patientSvc.removePatient(t).then((function(t){e.getPatients()})).catch((function(t){e.showAlert("Error saving patient","409"==t.status?"This patient's data was updated by somewhere else; please refresh data via the home page":t)}))},t.prototype.watchPatient=function(t){var e=this;this.patientSvc.watchPatient(t,this.currentAuthenticatedUsername).then((function(t){e.getPatients()})).catch((function(t){console.log(t)})),this.patientList.closeSlidingItems()},t.prototype.unWatchPatient=function(t){var e=this;this.patientSvc.unWatchPatient(t,this.currentAuthenticatedUsername).then((function(t){e.getPatients()})).catch((function(t){console.log(t)})),this.patientList.closeSlidingItems()},t.prototype.isWatchingPatient=function(t){return null!=t.watchers&&-1!=t.watchers.indexOf(this.currentAuthenticatedUsername)},t.prototype.getSurgerySummary=function(t){var e,n="",i=this.getSurgeryStatus(t);if(n="Surgery "+i.toString(),null!=t.surgery)switch(i){case o.a.Completed:var s=t.surgery.completedSurgeries[t.surgery.completedSurgeries.length-1];n+=": "+new Date(s.surgeryDate).toLocaleDateString()+" at "+s.facility+" with "+s.surgeonName;break;case o.a.Scheduled:null!=(e=t.surgery.scheduledSurgery)&&(n+=": "+e.type+" on "+new Date(e.scheduledDate).toLocaleDateString()+" at "+e.facility+" with "+e.surgeonName);break;case o.a.ScheduledToday:n+=": at "+(e=t.surgery.scheduledSurgery).facility+" with "+e.surgeonName;break;case o.a.NotScheduled:break;case o.a.NotIndicated:n+=t.surgery.surgeryNotIndicated.reason==a.a.Other?": "+t.surgery.surgeryNotIndicated.reasonOther:": "+t.surgery.surgeryNotIndicated.reason;break;default:n=o.a.NotIndicated}return n},t.prototype.getSurgeryStatus=function(t){var e=o.a.NotIndicated;if(null!=t.surgery&&(e=t.surgery.surgeryStatus)==o.a.Scheduled&&null!=t.surgery.scheduledSurgery){var n=this.dateUtils.daysFromToday(t.surgery.scheduledSurgery.scheduledDate);0==n?e=o.a.ScheduledToday:n<0&&(e=o.a.Missed)}return e},t.prototype.filterPatientList=function(t){var e=t.target.value;this.patients=e&&""!==e.trim()?this.originalPatientList.filter((function(t){return(t.lastName.toLowerCase()+", "+t.firstName.toLowerCase()).includes(e.toLowerCase())})):this.originalPatientList},t.prototype.displayPatientsBySortOrder=function(){switch(this.sortOrder){case"lastEditedDate":this.sortPatientListByLastEditedDate();break;case"ascName":this.sortPatientListByName("ascend");break;case"descName":this.sortPatientListByName("descend");break;case"ascSurgDate":this.sortPatientListBySurgDate("ascend");break;case"descSurgDate":this.sortPatientListBySurgDate("descend")}},t.prototype.sortPatientListByLastEditedDate=function(){this.patients=this.patients.sort((function(t,e){var n=0;return t.editedDate>e.editedDate?n=-1:t.editedDate<e.editedDate&&(n=1),n}))},t.prototype.sortPatientListByName=function(t){var e,n;"ascend"==t?(e=1,n=-1):(e=-1,n=1),this.patients=this.patients.sort((function(t,i){return t.lastName.toLowerCase()>i.lastName.toLowerCase()?e:t.lastName.toLowerCase()==i.lastName.toLowerCase()?0:n}))},t.prototype.sortPatientListBySurgDate=function(t){var e,n;"ascend"==t?(e=1,n=-1):(e=-1,n=1),this.patients=this.patients.sort((function(t,i){var s="";null!=t.surgery&&null!=t.surgery.scheduledSurgery&&(s=t.surgery.scheduledSurgery.scheduledDate);var r="";return null!=i.surgery&&null!=i.surgery.scheduledSurgery&&(r=i.surgery.scheduledSurgery.scheduledDate),s>r?e:s==r?0:n}))},t.prototype.showAlert=function(t,e){return i.b(this,void 0,void 0,(function(){return i.e(this,(function(n){switch(n.label){case 0:return[4,this.alertCtrl.create({header:t,message:e,buttons:["OK"]})];case 1:return[4,n.sent().present()];case 2:return n.sent(),[2]}}))}))},t.prototype.print=function(){},t.prototype.onErrorLoad=function(){alert("Error : printing is unavailable on your device ")},t.prototype.onSuccessPrint=function(){alert("printing done successfully !")},t.prototype.onErrorPrint=function(){alert("Error while printing !")},t}()},"59dD":function(t,e,n){"use strict";var i;n.d(e,"a",(function(){return i})),function(t){t.StageIV="Stage IV disease and surgery not indicated for palliation",t.Risk="Risk outweights benefit",t.Other="Other"}(i||(i={}))},"7wfR":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n("dYYQ"),s=n("CcnG"),r=function(){function t(t){this.dbSvc=t}return t.prototype.getPatient=function(t){return this.dbSvc.getDocument(t)},t.prototype.savePatient=function(t){return this.dbSvc.savePatient(t)},t.prototype.removePatient=function(t){return this.dbSvc.removePatient(t)},t.prototype.watchPatient=function(t,e){return null==t.watchers&&(t.watchers=[]),-1==t.watchers.indexOf(e)&&t.watchers.push(e),this.savePatient(t)},t.prototype.unWatchPatient=function(t,e){if(null!=t.watchers){var n=t.watchers.indexOf(e);-1!=n&&t.watchers.splice(n,1)}return this.savePatient(t)},t.prototype.notScheduled=function(t){return!this.scheduledForBiopsy(t)&&!this.scheduledForSurgery(t)},t.prototype.scheduledForBiopsy=function(t){var e=!1;return null!=t.biopsy&&null!=t.biopsy.scheduledBiopsy&&t.biopsy.scheduledBiopsy.scheduledDate>=(new Date).toISOString()&&(e=!0),e},t.prototype.scheduledForSurgery=function(t){var e=!1;return null!=t.surgery&&null!=t.surgery.scheduledSurgery&&t.surgery.scheduledSurgery.scheduledDate>=(new Date).toISOString()&&(e=!0),e},t.ngInjectableDef=s.S({factory:function(){return new t(s.W(i.a))},token:t,providedIn:"root"}),t}()},"8GA0":function(t,e,n){"use strict";var i;n.d(e,"a",(function(){return i})),function(t){t.All="All",t.ScheduledSurgery="Scheduled Surgery",t.ScheduledBiopsy="Scheduled Biopsy",t.NotScheduled="Nothing Scheduled"}(i||(i={}))},"8lHB":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var i=n("mrSG"),s=(n("ZZ/e"),n("dYYQ"),function(){function t(t,e,n,i,s,r){this.navCtrl=t,this.loadingCtrl=e,this.navParams=n,this.modalCtrl=i,this.events=s,this.dbService=r,this.page="login",this.credentials={}}return t.prototype.ngOnInit=function(){},t.prototype.signin=function(){return i.b(this,void 0,void 0,(function(){var t,e=this;return i.e(this,(function(n){switch(n.label){case 0:return[4,this.loadingCtrl.create({message:"Logging in..."})];case 1:return(t=n.sent()).present().then((function(){e.dbService.login(e.credentials.username,e.credentials.password).then((function(n){t.dismiss(),e.dismiss()})).catch((function(n){console.log(n),t.dismiss(),e.dismiss()}))})),[2]}}))}))},t.prototype.setMessage=function(t){this.message=t,this.error=null},t.prototype.setError=function(t){this.error=t,this.message=null},t.prototype.dismiss=function(){this.events.publish("userLoggedIn"),this.modalCtrl.dismiss()},t.prototype.reset=function(){this.error=null,this.message=null},t.prototype.showConfirmation=function(){this.page="confirm"},t}())},GTb5:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var i=n("dYYQ"),s=n("yOrE"),r=n("8GA0"),o=n("AafL"),a=n("hNfE"),u=n("CcnG"),c=function(){function t(t){this.dbSvc=t}return t.prototype.getPatientsByFilter=function(t,e){var n=this;return void 0===t&&(t=r.a.All),void 0===e&&(e={}),new Promise((function(i,s){var a;switch(t){case r.a.All:a=n.getPatients(e);break;case r.a.NotScheduled:a=n.getPatientsWithNothingScheduled();break;case r.a.ScheduledBiopsy:a=n.getPatientsScheduledForBiopsy();break;case r.a.ScheduledSurgery:a=n.getPatientsScheduledForSurgery()}if(null!=a)if(null!=e.watchingProvider){var u=new o.a;u.patients=[],a.then((function(t){for(var n=0,s=t.patients;n<s.length;n++){var r=s[n];null!=r.watchers&&-1!=r.watchers.indexOf(e.watchingProvider)&&u.patients.push(r)}u.totalRows=u.patients.length,i(u)}))}else i(a);else s("No patient filter specified")}))},t.prototype.getPatients=function(t){return void 0===t&&(t={}),this.dbSvc.getPatients(t)},t.prototype.getPatientsWithNothingScheduled=function(){var t={$and:[{$not:{$or:[{"surgery.surgeryStatus":s.a.Completed},{"surgery.surgeryStatus":s.a.Scheduled},{"biopsy.status":a.a.Completed},{"biopsy.status":a.a.Scheduled}]}},{$or:[{surgery:void 0},{"surgery.scheduledSurgery":void 0},{"surgery.scheduledSurgery.scheduledDate":{$lt:(new Date).toISOString()}},{"surgery.surgeryStatus":s.a.Missed},{"surgery.surgeryStatus":s.a.NotIndicated},{"surgery.surgeryStatus":s.a.NotScheduled}]},{$or:[{biopsy:void 0},{"biopsy.status":void 0},{"biopsy.status":a.a.NotIndicated},{"biopsy.status":a.a.NotScheduled},{"biopsy.scheduledBiopsy.scheduledDate":{$lt:(new Date).toISOString()}}]}]};return this.getPatientsBySelector(t)},t.prototype.getPatientsScheduledForSurgery=function(){var t={"surgery.scheduledSurgery.scheduledDate":{$gt:(new Date).toISOString()}};return this.getPatientsBySelector(t)},t.prototype.getPatientsScheduledForBiopsy=function(){var t={"biopsy.scheduledBiopsy.scheduledDate":{$gt:(new Date).toISOString()}};return this.getPatientsBySelector(t)},t.prototype.getPatientsBySelector=function(t){var e=this;return new Promise((function(n,i){e.dbSvc.getDb().find({selector:t}).then((function(t){var e=new o.a;e.patients=t.docs,e.totalRows=e.patients.length,n(e)})).catch((function(t){i(t)}))}))},t.prototype.getPatientsByIndex=function(t,e,n){var i=this;return new Promise((function(s,r){var a=i.dbSvc.getDb();a.createIndex({index:{fields:t,ddoc:e}}).then((function(){a.find({selector:n,use_index:e}).then((function(t){var e=new o.a;e.patients=t.docs,e.totalRows=e.patients.length,s(e)})).catch((function(t){r(t)}))})).catch((function(t){r(t)}))}))},t.ngInjectableDef=u.S({factory:function(){return new t(u.W(i.a))},token:t,providedIn:"root"}),t}()},Pbt4:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n("ZZ/e"),n("dYYQ");var i=function(){function t(t,e,n,i,s){this.navCtrl=t,this.navParams=e,this.modalCtrl=n,this.events=i,this.dbService=s}return t.prototype.ngOnInit=function(){},t.prototype.signout=function(){var t=this;this.dbService.logout().then((function(e){t.dismiss()}))},t.prototype.dismiss=function(){this.events.publish("userLoggedOut"),this.modalCtrl.dismiss()},t}()},hNfE:function(t,e,n){"use strict";var i;n.d(e,"a",(function(){return i})),function(t){t.Scheduled="Scheduled",t.NotScheduled="Not Scheduled",t.Completed="Completed",t.NotIndicated="Not Indicated"}(i||(i={}))},yOrE:function(t,e,n){"use strict";var i;n.d(e,"a",(function(){return i})),function(t){t.Completed="Completed",t.Scheduled="Scheduled",t.NotScheduled="Not Scheduled",t.NotIndicated="Not Indicated",t.ScheduledToday="Scheduled Today",t.Missed="Missed"}(i||(i={}))}}]);