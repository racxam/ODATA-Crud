sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("com.crud.odatacrud.controller.View1", {
            onInit: function () {
                this.onReadAll();
                // this.onReadWithFilters();
                // this.onReadWithSorted();
                // this.onReadParameters();
                // this.onReadKey();


            }, 
            onReadAll: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    success: function (oData) {
                        console.log(oData);
                        var jModel = new sap.ui.model.json.JSONModel(oData);
                        that.getView().byId("idProducts").setModel(jModel);

                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onReadWithFilters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Filter('Rating', 'EQ', '3');
                oModel.read("/Products", {
                    filters: [oFilter],
                    success: function (oData) {
                        var jModel = new sap.ui.model.json.JSONModel(oData);
                        that.getView().byId("idProducts").setModel(jModel);
                        console.log(oData);
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                })

            },

            onReadWithSorted: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oSorted = new sap.ui.model.Sorter('Price', true);
                oModel.read("/Products", {
                    sorters: [oSorted],
                    success: function (oData) {
                        console.log(oData);
                        var jModel = new sap.ui.model.json.JSONModel(oData);
                        that.getView().byId("idProducts").setModel(jModel)
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                })

            },

            onReadParameters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();

                oModel.read("/Products", {
                    urlParameters: {
                        $skip: 0,
                        $top:4,
                    }
                    ,
                    success: function (oData) {
                        console.log(oData);
                        var jModel = new sap.ui.model.json.JSONModel(oData);
                        that.getView().byId("idProducts").setModel(jModel);
                        
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onReadKey: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products(2)", {
                    success: function (oData) {
                        var jModel = new sap.ui.model.json.JSONModel({ results: [oData] } );
                        that.getView().byId("idProducts").setModel(jModel);
                    },
                    error:function(oError){
                        console.log(oError);
                    }
                })
            },
            onEdit: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oInput = oEvent.getSource().getParent().getParent().getCells()[3];
                oModel.setUseBatch(false);
                if (oEvent.getSource().getText() === 'Edit') {
                    oEvent.getSource().setText("Submit")
                   oInput.setEditable(true);
                } else {
                    oEvent.getSource().setText("Edit")
                    var oInputVal = oInput.getValue();
                    var oRowId = oEvent.getSource().getBindingContext().getProperty("ID");
                    
                  oInput.setEditable(false);
                    oModel.update("/Products("+oRowId+")", {Rating:oInputVal}, {
                        success: function (oData) {
                            that.onReadAll();

                             
                        },
                        error: function (Oerror) {
                            console.log(Oerror);
                        }
                    })
                }
                
            },
            onDelete: function (oEvent) {
                var that=this;
                var oModel=this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                var oId=oEvent.getSource().getBindingContext().getProperty("ID");
                oModel.remove("/Products("+oId+")",{
                    success:function(oData){
                        that.onReadAll();

                    },
                    error:function(oError){
                        console.log(oError);
                    }
                    
                })



                
            },
            onDuplicate: function (oEvent) {
                var that= this;
                var oModel= this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                var oDuplicateData=oEvent.getSource().getBindingContext().getObject();
                oDuplicateData.ID=100+oDuplicateData.ID;
                oModel.create("/Products",oDuplicateData,
                    {
                        success:function(oData){
                            that.onReadAll();

                        },
                        error:function(oError){
                            console.log(oError);
                        }
                    }
                )
                 
                
            }

        });
    });
