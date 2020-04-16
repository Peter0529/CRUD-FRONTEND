import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

// Datatables
require('datatables.net-bs')
require('datatables.net-bs4/js/dataTables.bootstrap4.js')
require('datatables.net-bs4/css/dataTables.bootstrap4.css')
require('datatables.net-buttons')
require('datatables.net-buttons-bs')
require('datatables.net-responsive')
require('datatables.net-responsive-bs')
require('datatables.net-responsive-bs/css/responsive.bootstrap.css')
require('datatables.net-buttons/js/buttons.colVis.js') // Column visibility
require('datatables.net-buttons/js/buttons.html5.js') // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js') // Flash file export
require('datatables.net-buttons/js/buttons.print.js') // Print view button
require('datatables.net-keytable');
require('datatables.net-keytable-bs/css/keyTable.bootstrap.css')
require('datatables.net-select');
require('jszip/dist/jszip.js');
require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');

/**
 * Wrapper component for dataTable plugin
 * Only DOM child elements, componets are not supported (e.g. <Table>)
 */
export default class DataTable extends Component {

    static propTypes = {
        /** datatables options object */
        options: PropTypes.object,
        /** only one children allowed */
        children: PropTypes.element.isRequired,
        /** callback that receives the datatable instance as param */
        dtInstance: PropTypes.func
    }

    static defaultProps = {
        options: {}
    }

    componentDidMount() {
        const dtInstance = $(this.tableElement).dataTable(this.props.options);
        
        
        // Set Click Rows Attribute
        // $(this.tableElement).on( 'click', 'tr', function () {
        //     $(this).toggleClass('selected');
        // } );
     
        // $('#button').click( function () {
            
        //     alert( dtInstance.api().rows('.selected').data().length +' row(s) selected' );
        // } );

        $(this.tableElement).on('click', '#select_all', function() {
            if ($('#select_all:checked').val() === 'on') {
                dtInstance.api().rows({ page: 'current' }).select();
            }
            else {
                dtInstance.api().rows({ page: 'current' }).deselect();
            }
          }); 
        
        // Click Delete Selected Rows Function
        $("#delete_selected").on('click', function(){
            var data = dtInstance.api().rows('.selected').data();
            var selected_ids=[]; 
            for(var i = 0; i< data.length;i++){
                
                selected_ids.push(data[i]['id']);//ids
            }
            localStorage.setItem("selected_ids", JSON.stringify(selected_ids));
            dtInstance.api().rows('.selected').remove().draw( false );
        });

        // $(this.tableElement).on('click', '#bt_email_edit', function(){
        //     var id = $(this).data('id');
        //     editEmail(id);
        //   });
        // filter for campaign on emails page
        // dtInstance.api().rows('.unchecked_camp').select().draw(false);
        
        $('#filter_campaign').on('change',function(){
            // dtInstance.api().filter().clear();
            if(this.value === "all")
                dtInstance.api().columns().search('').draw();
            if(this.value === "s1")        
                dtInstance.api().columns("#dt_s1").search("1").columns("#dt_s2").search("").columns("#dt_s3").search("").draw();
            else if(this.value === "s2")
                dtInstance.api().columns("#dt_s1").search("").columns("#dt_s2").search("1").columns("#dt_s3").search("").draw();
            else if(this.value === "s3")
                dtInstance.api().columns("#dt_s1").search("").columns("#dt_s2").search("").columns("#dt_s3").search("1").draw();
        })

        $(this.tableElement).on('click', '#delete', function(e) {
            // e.target.parentNode.parentNode;
            dtInstance.api().rows(e.target.parentNode.parentNode).remove().draw( false );
        });

        if(this.props.dtInstance)
            this.props.dtInstance(dtInstance)
    }

    componentWillUnmount() {
        $(this.tableElement).dataTable({destroy: true});
    }

    setRef = node => this.tableElement = node;

    render() {
        return (
            React.cloneElement(React.Children.only(this.props.children), {
                ref: this.setRef
            })
        )
    }
    
}
