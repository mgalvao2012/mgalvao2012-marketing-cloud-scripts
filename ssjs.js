<script runat="server">
   Platform.Load("core","1");
   var produtosDE = DataExtension.Init('VTEX_PRODUTOS_MASTERDATA');
   var produtosRS = produtosDE.Rows.Lookup(['CTR'], ['1']);	
   if (produtosRS.length > 0) {	
      for (var i = 0; i < produtosRS.length; i++) {
			var vsku = produtosRS[i]['SKUID'];
         var url = 'http://whirlpool.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=productId:'+vsku;
         var response = HTTP.Get(url);
         var vmeustatus = "OK";
         if (response.Content == "") {
				var vmeustatus = "NOK NAOACHOU";
			}
         if (response.Content == "[]") {
				var vmeustatus = "NOK VAZIO";
			}
         if (vmeustatus == "OK") {
            //----------------------------------------------------------
            var str = response.Content;
            var n = str.length;
            var xstr = str.substring(1, n-1);
            var obj = Platform.Function.ParseJSON(xstr);
            var vbrand = obj.brand;
            var vproductName = obj.productName;
            var vlinkText = obj.linkText;
            var vproductReference = obj.productReference;
            var vcategories = obj.categories.toString();
            var vlink = obj.link;
            //----------------------------------------------------------
            // ImageURL
            var txt = '"imageUrl":"';
            var x0 = txt.length;
            var x1 = xstr.indexOf('"imageUrl":"');
            var x2 = x1+500;
            var xaux = xstr.substring(x1, x2);
            var x3 = xaux.indexOf('",');
            var vimageUrl  = xaux.substring(x0,x3);
            //----------------------------------------------------------

            var XDE = DataExtension.Init("VTEX_PRODUTOS_MASTERDATA");
            XDE.Rows.Update({
               productName:vproductName,
               brand:vbrand,
               linkText:vlinkText,
               productReference:vproductReference,
               categories:vcategories,
               link:vlink,
               imageUrl:vimageUrl
            }, ["SKUID"], [vsku]);
				//----------------------------------------------------------										                 
         }
      }
   }
</script>



