sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
 ], function (Controller, jQuery, Filter, Sorter) {
	"use strict";
	return Controller.extend("org.ubb.books.controller.Checkout", {

		_oResponsivePopover: null,

		onBackButtonPressed : function(){

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app", true);
		},
		
        onInit: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("checkout").attachPatternMatched(this._onObjectMatched, this);

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/Z801_LIBRARY_GECU3_SRV");//Here
			this.getView().setModel(oModel);
          	var that = this;
          	if (!this._oResponsivePopover) {
          	  this._oResponsivePopover = sap.ui.xmlfragment("org.ubb.books.view.SortFilter", this);
          	  this._oResponsivePopover.setModel(this.getView().getModel());
          	}
          	var oTable = this.getView().byId("idCheckoutsTable");
          	oTable.addEventDelegate({
          	  onAfterRendering: function() {
				console.log("delegate");
          	    var oHeader = this.$().find('.sapMListTblHeaderCell'); //Get hold of table header elements
          	    for (var i = 0; i < oHeader.length; i++) {
          	      var oID = oHeader[i].id;
          	      that.onClick(oID);
          	    }
          	  }
          	}, oTable);
        },
 	})
})