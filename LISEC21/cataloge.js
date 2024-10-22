var Cataloge = new Array();
var CatalogPfad = new Array();
var CatalogFirstArticle = new Array();
var CatalogAnzeige=true;
var CurrentIndex=0;

function setIndex()
{
    if(window.location.search!=null){
	  CurrentIndex=window.location.search.substring(1).split("=")[1];
    }
    document.body.onunload = CatalogClosed;
    self.onunload=CatalogClosed;

}

function showCataloge()
{  
    code="<div ID='Kataloge'>";
    for(i=0;i<Cataloge.length;i++){      
      if (i!=0){ code=code+"<span class='txtNormal'>&nbsp;|&nbsp;</span>";}      
      code=code+"<a href='javascript:ladeCatalog(" + i + ")' class='farbig'>"  + Cataloge[i] + "</a>";      
    }
    code=code+"</div>";
    document.write(code);
 
}

function setCatalogAnzeige()
{
   if (CatalogAnzeige==true){
      CatalogAnzeige=false;
	document.getElementById("Kataloge").innerHTML="";      
   }
   else{
      CatalogAnzeige=true;  
      code="";
	for(i=0;i<Cataloge.length;i++){      
        if (i!=0){ code=code+"<span class='txtNormal'>&nbsp;&nbsp;</span>";}      
        code=code+"<a href='javascript:ladeCatalog(" + i + ")' class='farbig'>"  + Cataloge[i] + "</a>";      
      }

      document.getElementById("Kataloge").innerHTML=code;

   }
}

function ladeCatalog(index){
  if (CurrentIndex!=index){
  	parent.menuFrame.location="../" + CatalogPfad[index] + "/menu.htm?Index=" + index;
 	parent.leftFrame.location="../" + CatalogPfad[index] + "/navigation.htm";
  	parent.mainFrame.location="../" + CatalogPfad[index] + "/htm/" + CatalogFirstArticle[index];

  

  	parent.watchlist=null;
  	parent.lastSelected=null;
  	parent.languageIndex=1;

  	if (parent.watchlistWindowReference!=null){
     		if (parent.watchlistWindowReference.closed==false){
         		parent.watchlistWindowReference.close();
     		}
  	}

  	if (parent.searchWindowReference!=null){
     		if (parent.searchWindowReference.closed==false){
         		parent.searchWindowReference.close();
     		}
  	}

   }

}

function CatalogClosed(){

   if (parent.watchlistWindowReference!=null){
     		if (parent.watchlistWindowReference.closed==false){
         		parent.watchlistWindowReference.close();
     		}
  	}

  	if (parent.searchWindowReference!=null){
     		if (parent.searchWindowReference.closed==false){
         		parent.searchWindowReference.close();
     		}
  	}


}
