(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"1qw0":function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.None="None",t.Positive="Positive",t.Negative="Negative"}(r||(r={}))},"5JEp":function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.Positive="Positive",t.Negative="Negative",t.NotDetermined="Not Determined"}(r||(r={}))},"7wfR":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("dYYQ"),u=n("CcnG"),o=function(){function t(t){this.dbSvc=t}return t.prototype.getPatient=function(t){return this.dbSvc.getDocument(t)},t.prototype.savePatient=function(t){return this.dbSvc.savePatient(t)},t.prototype.removePatient=function(t){return this.dbSvc.removePatient(t)},t.prototype.watchPatient=function(t,e){return null==t.watchers&&(t.watchers=[]),-1==t.watchers.indexOf(e)&&t.watchers.push(e),this.savePatient(t)},t.prototype.unWatchPatient=function(t,e){if(null!=t.watchers){var n=t.watchers.indexOf(e);-1!=n&&t.watchers.splice(n,1)}return this.savePatient(t)},t.prototype.notScheduled=function(t){return!this.scheduledForBiopsy(t)&&!this.scheduledForSurgery(t)},t.prototype.scheduledForBiopsy=function(t){var e=!1;return null!=t.biopsy&&null!=t.biopsy.scheduledBiopsy&&t.biopsy.scheduledBiopsy.scheduledDate>=(new Date).toISOString()&&(e=!0),e},t.prototype.scheduledForSurgery=function(t){var e=!1;return null!=t.surgery&&null!=t.surgery.scheduledSurgery&&t.surgery.scheduledSurgery.scheduledDate>=(new Date).toISOString()&&(e=!0),e},t.ngInjectableDef=u.S({factory:function(){return new t(u.W(r.a))},token:t,providedIn:"root"}),t}()},HX6z:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){return function(){}}()},aPQr:function(t,e,n){"use strict";n.r(e),n.d(e,"SurgeryPageModuleNgFactory",(function(){return g}));var r=n("CcnG"),u=n("YkyS"),o=n("pMnS"),i=n("NdmL"),c=n("ZHCR"),a=n("ybpU"),s=n("K6d4"),d=n("Ip0R"),f=n("gIcY"),p=n("ZZ/e"),b=n("ZYCi"),h=n("QIR9"),l=n("FlGi"),v=n("UTjK"),y=n("0FmN"),g=r.mb(u.a,[],(function(t){return r.wb([r.xb(512,r.j,r.bb,[[8,[o.a,i.a,c.a,a.a,s.a]],[3,r.j],r.x]),r.xb(4608,d.m,d.l,[r.u,[2,d.w]]),r.xb(4608,f.m,f.m,[]),r.xb(4608,p.b,p.b,[r.z,r.g]),r.xb(4608,p.Jb,p.Jb,[p.b,r.j,r.q]),r.xb(4608,p.Ob,p.Ob,[p.b,r.j,r.q]),r.xb(1073742336,d.b,d.b,[]),r.xb(1073742336,f.k,f.k,[]),r.xb(1073742336,f.b,f.b,[]),r.xb(1073742336,p.Gb,p.Gb,[]),r.xb(1073742336,b.o,b.o,[[2,b.u],[2,b.m]]),r.xb(1073742336,u.a,u.a,[]),r.xb(1024,b.k,(function(){return[[{path:"completed-surgery",component:h.a},{path:"completed-surgery/:completedSurgeryId",component:h.a},{path:"scheduled-surgery",component:l.a},{path:"not-scheduled-surgery",component:v.a},{path:"not-indicated-surgery",component:y.a}]]}),[])])}))},ciPi:function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.IDC="Invasive Ductal Carcinoma",t.ILC="Invasive Lobular Carcinoma",t.DCIS="Ductal Carcinoma In Situ",t.LCIS="Lobular Carcinoma In Situ",t.Other="Other"}(r||(r={}))},cnc1:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){return function(){}}()},cr2S:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){return function(){}}()},e4V3:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){return function(){}}()},zXiK:function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.G1="Grade 1/Low Grade",t.G2="Grade 2/Intermediate Grade",t.G3="Grade 3/High Grade",t.Unable="Unable to Grade",t.NotGiven="No Grade Given"}(r||(r={}))}}]);