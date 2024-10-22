var languages=new Array("Deutsch","English");
var languageImage=new Array("deutsch_ico.gif","englisch_ico.gif");

// -------------------------------------------
// Article.htm
function changearticle(loc)
{
   self.article.location=loc;
}

function redirect(nid)
{
   parent.mainFrame.location= nid.replace(/\./g,"_") +".htm?NID=" + nid;	
   parent.leftFrame.naviFrame.ddtreemenu.openNode('treemenu1',nid);

}

function showArtikelBezeichnung(index)
{
  if (parent.languageIndex==1){
    document.write("&nbsp;&nbsp;&nbsp;" + ArtikelNummer[index] + " / " + ArtikelNamenE[index]);
  }
  else{
    document.write("&nbsp;&nbsp;&nbsp;" + ArtikelNummer[index] + " / " + ArtikelNamenD[index]);
  }
}

function showArtikelImage(index)
{
  //document.write("<img src='../img/" + ArtikelImages[index] + "' border='0' usemap='#assembly'>");
   document.getElementById("imageRow").style.backgroundImage="url('../img/" + ArtikelImages[index] + "')";
}

function showArtikelImageToPrint(index)
{
   document.write("<img src='../img/" + ArtikelImages[index] + "' border='0' />");
}

function doOpenNode()
{
  if (window.location.search!=""){
     parent.leftFrame.naviFrame.ddtreemenu.openNode('treemenu1',window.location.search.substring(1).split("=")[1]);
  }
}


// ArticleInfo.htm
// -------------------------------------------

function showArticleInfoName(index)
{
  if (parent.parent.languageIndex==1){
    document.write(ArtikelNamenE[index]);
  }
  else{
    document.write(ArtikelNamenD[index]);
  }
}

function showArticleInfoNumber(index)
{
  if(Hyperlink!=""){
     document.writeln('<a class="txtNormalFettBlau" target="_blank" href="' + Hyperlink.replace("{%1}",ArtikelNummer[index]) + '">' + ArtikelNummer[index] + '</a>');
  }
  else{
     document.writeln(ArtikelNummer[index]);
  }
}


function showArticleDescription(index)
{
  if (parent.parent.languageIndex==1){
    return ArtikelBeschreibungE[index];
  }
  else{
    return ArtikelBeschreibungD[index];
  }
}

function showArticleInfoPicture(index)
{
  document.writeln('<a href="javascript:redirectArticleInfo()"><img src="../img/' + getThumbnailname(ArtikelImages[index],"_ai") + '" border="0" style="height:120px"></a>');
}

function getThumbnailname(filename,location)
{
  if (filename=="spot.gif"){
	return filename;
  }
  else{
	return filename.substring(0,filename.lastIndexOf(".jpg")) + location + ".jpg";
  }
}


// -------------------------------------------
// empty.htm
function AddArticleToWatchlist(){
      vorhanden=false;
      nid=ArtikelIDs[parent.getIndex()];          
	  watchlist=parent.parent.watchlist;
	
	  if (watchlist!=null){
          for (i=0;i<watchlist.length;i++){
	       if (nid==watchlist[i]){
		    vorhanden=true;
             }
          }
          if (vorhanden==false){
	       watchlist[watchlist.length]=nid;
	      }
      }
      else{
        watchlist=new Array(1);
        watchlist[0]=nid;
      }

      parent.parent.watchlist=watchlist;

      if (WatchlistWindowIsOpened()==true){      	
         parent.parent.watchlistWindowReference.location.reload();
      }

	getWatchlistInfo();
}

function WatchlistWindowIsOpened(){	
  if (parent.parent.watchlistWindowReference!=null){
    if (parent.parent.watchlistWindowReference.closed){
    	 return false;
    }
    else{    	
       return true;
    }
  }
  else{  	
    return false;
  }
}

function openWatchlistFromArticleInfo(){
	if (WatchlistWindowIsOpened()==false){
	  parent.parent.watchlistWindowReference= window.parent.parent.open('../watchlist.htm','Watchlist','width=670,height=250,scrollbars=yes,left=200,top=200');
	  parent.parent.watchlistWindowReference.opener = window.parent.parent;
	}
	if (window.focus) {parent.parent.watchlistWindowReference.focus()}
}


function sumWatchlistArtikel(){
  text="";
  if(parent.parent.watchlist!=null){
     if(parent.parent.watchlist.length==1){
	  text="Watchlist: 1 item";
     }
     else{
        text="Watchlist: " + parent.parent.watchlist.length + " items";
     }
  }
  else{
     text="Watchlist: 0 items";
  }

  return text;
}

function getWatchlistInfo(){
  document.getElementById("WatchlistInfo").innerHTML=sumWatchlistArtikel();
}

// -------------------------------------------
// search.htm

function gotoSearch()
{	
  document.getElementById("Nachricht").innerHTML="";	
  if(document.form1.text_name.value.length>=3){   	
    searchvalue=document.form1.text_name.value;   
    self.Suchergebnisse.location="searchresult.htm?Suche=" + searchvalue;

  }
  else{
    if (opener.parent.languageIndex==1){
       document.getElementById("Nachricht").innerHTML="&nbsp;&nbsp;You need at least 3 character for searching.";
    }
    else{
       document.getElementById("Nachricht").innerHTML="&nbsp;&nbsp;F&uuml;r Suche werden mind. 3 Zeichen ben&ouml;tigt.";
    }
  }

  return false;
}

function tastenTest(btn)
{
   // process only the Enter key
   if (event.keyCode == 13)
   {
      // cancel the default submit
      event.returnValue=false;
      event.cancel = true;
      // submit the form by programmatically clicking the specified button
      btn.click();
   }
}


// -------------------------------------------
// searchresult.htm

var ArtikelNummer=new Array(##SearchNummern##);
var ArtikelNamenD=new Array(##SearchNamenD##);
var ArtikelNamenE=new Array(##SearchNamenE##);
var ArtikelImages=new Array(##SearchImages##);
var ArtikelIDs=new Array(##SearchIDs##);
var searchvalue;
var Artikelzeichnung=new Array(##SearchZeichnung##);
var ArtikelDokumente=new Array(##SearchDokumente##);
var ArtikelBeschreibungD=new Array(##SearchBeschreibungD##);
var ArtikelBeschreibungE=new Array(##SearchBeschreibungE##);
var Hyperlink="##Hyperlink##";

function search(){	

  if (window.location.search.substring(1)!=""){
    document.getElementById("Nachricht").innerHTML="";    
    searchvalue=window.location.search.substring(1).split("=")[1];    
    searchvalue=sonderzeichenSuchwert(searchvalue).toLowerCase();
	  	    
    var code;    
    code="<table><tr>"

    if (parent.opener.parent.languageIndex==1){
       ArtikelNamen=ArtikelNamenE;
    }
    else{
       ArtikelNamen=ArtikelNamenD;
    }
    
    for(i=0;i<=ArtikelNummer.length-1;i++)
    {  
    	 
       if ((ArtikelNummer[i].toLowerCase().indexOf(searchvalue)!=-1) || (ArtikelNamen[i].toLowerCase().indexOf(searchvalue)!=-1)){
         code=code+"<td valign='top'><table width='150px'><tr><td><span class='txtNormalFettBlau' >" + ArtikelNummer[i] + "</span><br><span class='txtNormalFett'>" +ArtikelNamen[i]+"</span><br>";
         code=code + "<a href='javascript:openArtikel(\"" + i +"\");'><img src='img/" + getThumbnailname(ArtikelImages[i],"_sw") + "' ";
         if (ArtikelImages[i]=="spot.gif"){ code=code+"style='width:105px;border-color:000000;' border='1'></a></td></tr></table></td>";}
	   else { code=code+"style='width:150px;' border='0'></a></td></tr></table></td>";}
        }
     }
     
     if (code.indexOf("<td>")==-1){
        code=code+"<td><span class='txtNormal'>&nbsp;&nbsp;";
        if (parent.opener.parent.languageIndex==1){
     	     code=code+"The search returned no results.";
        }
        else{
     	     code=code+"Die Suche ergab keine Ergebnisse.";
        }
        code=code+"</span></td></tr></table>";
     }
     code=code+"</tr></table>";
     document.getElementById("Nachricht").innerHTML=code;
	
  } 
}

function sonderzeichenSuchwert(str){

	str=str.replace("%20"," ");
	str=str.replace("%22","\"");
	
	//ue
	str=str.replace(String.fromCharCode(38,70,67),"&uuml;");
	str=str.replace(String.fromCharCode(252),"&uuml;");
	str=str.replace("%FC","&uuml;");
	
	//Ue
	str=str.replace(String.fromCharCode(38,68,67),"&Uuml;");
	str=str.replace(String.fromCharCode(220),"&Uuml;");
	str=str.replace("%DC","&Uuml;");
	
	//ae
	str=str.replace(String.fromCharCode(38,69,52),"&auml;");
	str=str.replace(String.fromCharCode(228),"&auml;");
	str=str.replace("%E4","&auml;");
	
	//Ae
	str=str.replace(String.fromCharCode(38,67,52),"&Auml;");
	str=str.replace(String.fromCharCode(196),"&Auml;");
	str=str.replace("%C4","&Auml;");
	
	//oe
	str=str.replace(String.fromCharCode(38,70,54),"&ouml;");
	str=str.replace(String.fromCharCode(246),"&ouml;");
	str=str.replace("%F6","&ouml;");

      //Oe
	str=str.replace(String.fromCharCode(38,68,54),"&Ouml;");
	str=str.replace(String.fromCharCode(214),"&Ouml;");
	str=str.replace("%D6","&Ouml;");
	
	//ss
	str=str.replace("%DF","&szlig;");


      // Grad Zeichen
      str=str.replace("%B0","&deg;");

	// Hoch 2 Zeichen
	str=str.replace("%B2","&sup2;")	

	// Hoch 3 Zeichen
	str=str.replace("%B3","&sup3;")

	return str;
}	

function openArtikel(selectedId){
	parent.opener.mainFrame.location="htm/" + ArtikelIDs[selectedId].replace(/\./g,"_") +".htm?NID=" + ArtikelIDs[selectedId];	
	parent.opener.leftFrame.naviFrame.ddtreemenu.openNode('treemenu1',ArtikelIDs[selectedId]);
}



// -------------------------------------------
// watchlist.htm

function getWatchlist(){
  if (parent.opener.languageIndex==1){
     ArtikelNamen=ArtikelNamenE;
  }
  else{
     ArtikelNamen=ArtikelNamenD;
  }

  index=0;
  if (opener.watchlist!=null){ 
	watchlist=opener.watchlist;
	  code="<div class='noprint' style='float:right;width:30%;'><table width='100%' cellspacing='0' cellpadding='0'><tr><td height='25' background='img/balken3.gif' align='right'><a href='javascript:printAll()' class='LinkNormalSchwarz'><img src='img/printer.gif' border='0' align='absmiddle' /></a>&nbsp;</td></tr></table></div><div class='noprint' style='float:left;width:100%'><table><tr>";
	  codePrint="<div class='toprint'>";
		for (i=0;i<ArtikelNummer.length;i++){			
		  if(ArtikelIDs[i]==watchlist[index]){		
				 code=code+"<td valign='top'><table width='150px'><tr><td><span class='txtNormalFettBlau' >" + ArtikelNummer[i] + "</span><br><span class='txtNormalFett'>" +ArtikelNamen[i]+"</span><br>";
         			 code=code + "<a href='javascript:openArtikel(\"" + i +"\");'><img src='img/" + getThumbnailname(ArtikelImages[i],"_sw")  + "' ";
                         if (ArtikelImages[i]=="spot.gif") { code=code+"style='width:105px;border-color:000000;' border='1'></a></td></tr>";}
				 else{ code=code+"style='width:150px;' border='0'></a></td></tr>";}
				 code=code + "<tr><td><a href='javascript:deleteFromWatchlist(\"" +  watchlist[index] + "\")' class='LinkNormalSchwarz'><img src='img/trash.gif' border='0' align='absmiddle' alt='Delete' /></a></td></tr></table></td>";     
				
 				 codePrint=codePrint+"<table";

				 if (index%2==0 && index!=0){ codePrint=codePrint+" class='Seitenumbruch'"; }
				 codePrint=codePrint+"><tr><td><span class='txtNormalFett'>" + ArtikelNummer[i] + " / " +ArtikelNamen[i]+"</span></td></tr>";
   		   codePrint=codePrint + "<tr><td height='400px' valign='top' align='left'><img src='img/" + ArtikelImages[i] + "' border='0'></td></tr>";
   		   if (index%2==0){ codePrint=codePrint+"<tr><td height='20'></td></tr></table>";}
   		   else { codePrint=codePrint+"</table>";}   


				if (index+1 < watchlist.length){
					index=index+1;
					i=-1;
					
					if (index%4==0){
						code = code + "</tr><tr>";
					}
				}
				else{					
					for (j=0;j<(3-(index%4));j++){
						code=code+"<td></td>";
					}									
					break;					
				}
					
			}
	  }
	  code=code+"</tr></table></div>";
	  codePrint=codePrint+"</div>";
        code=code+codePrint;
	  document.write(code);

  }
  else{ 
     if(parent.opener.languageIndex==1){
         document.write("<div class='noprint' style='float:right;width:30%'><table width='100%' cellspacing='0' cellpadding='0'><tr><td height='25' background='img/balken3.gif'></td></tr></table></div><div class='noprint' style='float:left;width=100%'><span class='txtNormal'>&nbsp;&nbsp;There are no article in the watchlist.</span></div>");
     }else{
         document.write("<div class='noprint' style='float:right;width:30%'><table width='100%' cellspacing='0' cellpadding='0'><tr><td height='25' background='img/balken3.gif'></td></tr></table></div><div class='noprint' style='float:left;width=100%'><span class='txtNormal'>&nbsp;&nbsp;Es sind keine Artikel in der Watchlist vorhanden.</span></div>");
     }
  }
}

function deleteFromWatchlist(nid){
	for (i=0;i<opener.watchlist.length;i++){
		if(opener.watchlist[i]==nid){	
			opener.mainFrame.removeFromWatchlist(i);
			location.reload();
			break;
		}
	}
	
}

function printAll(){
   self.focus();
   self.print();
}


// -------------------------------------------
// menu.htm

function openSearch() {
	if(SearchIsOpenedFromMenue()==false)
      {
	  parent.searchWindowReference= window.parent.open('search.htm','Suchen','width=480,height=280,left=250,top=200');
	  parent.searchWindowReference.opener = window.parent;
	}
	if (window.focus) {parent.searchWindowReference.focus()}
}


function goBack()
{
	history.back();	
}

function goForeward()
{
	history.forward();
}

function goFolderup()
{
	if(window.parent.lastSelected!=null){
		nid=window.parent.leftFrame.naviFrame.ddtreemenu.Folderup('treemenu1');
		if (nid!=null){
			window.parent.mainFrame.location="htm/" + nid.replace(/\./g,"_") +".htm?NID=" + nid;
		}
		
	}
}


function openWatchlist(){
	if (WatchlistIsOpenedFromMenue()==false){
	  parent.watchlistWindowReference= window.parent.open('watchlist.htm','Watchlist','width=670,height=250,scrollbars=yes,left=200,top=200');
	  parent.watchlistWindowReference.opener = window.parent;
	}
	if (window.focus) {parent.watchlistWindowReference.focus()}
}

function removeFromWatchlist(index)
{
   var newArray=new Array();
   var newIndex=0;

   if (parent.watchlist!=null){
       if (parent.watchlist.length==1){ parent.watchlist=null; }
       else {
          for (i=0;i<parent.watchlist.length;i++){
              if (index==i){continue;}
              newArray[newIndex]=parent.watchlist[i];
              newIndex=newIndex+1;              
          }
          parent.watchlist=newArray;
       }   
   }   
}


function printThisArticle(){
  parent.mainFrame.focus();
  parent.mainFrame.print();
}

function WatchlistIsOpenedFromMenue(){
  if (parent.watchlistWindowReference!=null){
    if (parent.watchlistWindowReference.closed){
    	 return false;
    }
    else{    	
       return true;
    }
  }
  else{  	
    return false;
  }
}

function SearchIsOpenedFromMenue(){
  if (parent.searchWindowReference!=null){
    if (parent.searchWindowReference.closed){
    	 return false;
    }
    else{    	
       return true;
    }
  }
  else{  	
    return false;
  }
}


function showLanguages(){
  str="";
  for (i=0;i<languages.length;i++){
    if(i!=0){ str=str+"<span class='txtNormal'>&nbsp;&nbsp;</span>"; }
    str=str+"<a href='javascript:changeLanguage(" + i + ")'><img src='img/"+languageImage[i]+"' border='0' width='15' height='11' align='absmiddle' alt='"+ languages[i] + "' /></a>";
  }
  document.write(str);
}

function changeLanguage(idx){
  if(idx>=0 && idx<languages.length){
    parent.languageIndex=idx;
    parent.leftFrame.naviFrame.location.href="navigate"+ languages[idx].substr(0,1) + ".htm";
    parent.mainFrame.location.reload();

    
    if(WatchlistIsOpenedFromMenue){ parent.watchlistWindowReference.location.reload();}
    if(SearchIsOpenedFromMenue){ parent.searchWindowReference.location.reload();}
  }
}



// -------------------------------------------
// navigate.htm
function redirectAssembly(nid)
{
	window.parent.parent.mainFrame.location="htm/" + nid.replace(/\./g,"_") +".htm?NID=" + nid;
}