const updateTbl = () => {
  $('#allOrderTbl').DataTable().ajax.reload();
  $('#notApproveOrderTbl').DataTable().ajax.reload();
  $('#approveOrderTbl').DataTable().ajax.reload();
  $('#unApproveOrderTbl').DataTable().ajax.reload();
};

$.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
  notiError('Lỗi Server');
};

const configAllOrderTbl = () => {
  $('#allOrderTbl').dataTable({
    autoWidth: false,
    processing: true,
    serverSide: true,
    ajax: {
      type: 'GET',
      url: '/api/v1/medical-forms/me?populate=medicalDepartment,shift&status=0&status=1&status=2',
      dataSrc: function (json) {
        $('#allOrderNav span').html(`(${json.data.length})`);

        json.data.forEach((element, index) => {
          element.index = index + 1;
          element.time = `
            <p>
              ${element.shift.time} 
              <br>
              (${moment(element.medicalDay).format('YYYY-MM-DD')})
            </p>
          `;
          element.method = `
          <div class="div_icon">
            <span title="Thông tin" id="btn-detail" class="model_img mr-1" data-toggle="modal" data-target="#infoOrderModal"><i class="mdi mdi-file-document" style="font-size: 18px"></i></span>
          </div>
          `;
        });

        return json.data;
      },
    },
    columns: [
      { data: 'index', width: '10%' },
      { data: 'fullName', width: '*' },
      { data: 'gender', width: '10%' },
      {
        data: 'birthday',
        width: '12%',
        render: (value) => moment(value).format('YYYY-MM-DD'),
      },
      {
        data: 'medicalDepartment',
        width: '20%',
        render: (item) => {
          return item.name;
        },
      },
      { data: 'time', width: '12%' },
      { data: 'method', className: 'text-center', width: '12%' },
    ],
    columnDefs: [
      {
        searchable: true,
        targets: 1,
      },
      {
        orderable: false,
        targets: [0, 6],
      },
    ],
    language: {
      sProcessing: 'Đang xử lý...',
      sLengthMenu: 'Chọn số bản ghi hiển thị trên một trang _MENU_',
      sZeroRecords: 'Không có dữ liệu để hiển thị.',
      sInfo: 'Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_',
      sInfoEmpty: 'Hiển thị từ 0 đến 0 trong tổng số 0 mục',
      sInfoFiltered: '(được lọc từ _MAX_ bản ghi)',
      sInfoPostFix: '',
      sSearch: 'Tìm kiếm theo họ và tên:',
      sUrl: '',
      oPaginate: {
        sFirst: 'Đầu',
        sPrevious: 'Trước',
        sNext: 'Tiếp',
        sLast: 'Cuối',
      },
    },
  });
};

const configNotApproveOrderTbl = () => {
  $('#notApproveOrderTbl').dataTable({
    autoWidth: false,
    processing: true,
    serverSide: true,
    ajax: {
      type: 'GET',
      url: '/api/v1/medical-forms/me?populate=medicalDepartment,shift&status=0',
      dataSrc: function (json) {
        $('#notApproveOrderNav span').html(`(${json.data.length})`);

        json.data.forEach((element, index) => {
          element.index = index + 1;
          element.time = `
            <p>
              ${element.shift.time} 
              <br>
              (${moment(element.medicalDay).format('YYYY-MM-DD')})
            </p>
          `;
          element.method = `
          <div class="div_icon">
            <span title="Thông tin" id="btn-detail" class="model_img mr-1" data-toggle="modal" data-target="#infoOrderModal"><i class="mdi mdi-file-document" style="font-size: 18px"></i></span>
          </div>
          `;
        });

        return json.data;
      },
    },
    columns: [
      { data: 'index', width: '10%' },
      { data: 'fullName', width: '*' },
      { data: 'gender', width: '10%' },
      {
        data: 'birthday',
        width: '12%',
        render: (value) => moment(value).format('YYYY-MM-DD'),
      },
      {
        data: 'medicalDepartment',
        width: '20%',
        render: (item) => {
          return item.name;
        },
      },
      { data: 'time', width: '12%' },
      { data: 'method', className: 'text-center', width: '12%' },
    ],
    columnDefs: [
      {
        searchable: true,
        targets: 1,
      },
      {
        orderable: false,
        targets: [0, 6],
      },
    ],
    language: {
      sProcessing: 'Đang xử lý...',
      sLengthMenu: 'Chọn số bản ghi hiển thị trên một trang _MENU_',
      sZeroRecords: 'Không có dữ liệu để hiển thị.',
      sInfo: 'Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_',
      sInfoEmpty: 'Hiển thị từ 0 đến 0 trong tổng số 0 mục',
      sInfoFiltered: '(được lọc từ _MAX_ bản ghi)',
      sInfoPostFix: '',
      sSearch: 'Tìm kiếm theo họ và tên:',
      sUrl: '',
      oPaginate: {
        sFirst: 'Đầu',
        sPrevious: 'Trước',
        sNext: 'Tiếp',
        sLast: 'Cuối',
      },
    },
  });
};

const configApproveOrderTbl = () => {
  $('#approveOrderTbl').dataTable({
    autoWidth: false,
    processing: true,
    serverSide: true,
    ajax: {
      type: 'GET',
      url: '/api/v1/medical-forms/me?populate=medicalDepartment,shift&status=1',
      dataSrc: function (json) {
        $('#approveOrderNav span').html(`(${json.data.length})`);

        json.data.forEach((element, index) => {
          element.index = index + 1;
          element.time = `
            <p>
              ${element.shift.time} 
              <br>
              (${moment(element.medicalDay).format('YYYY-MM-DD')})
            </p>
          `;
          element.method = `
          <div class="div_icon">
            <span title="Thông tin" id="btn-detail" class="model_img mr-1" data-toggle="modal" data-target="#infoOrderModal"><i class="mdi mdi-file-document" style="font-size: 18px"></i></span>
          </div>
          `;
        });

        return json.data;
      },
    },
    columns: [
      { data: 'index', width: '10%' },
      { data: 'fullName', width: '*' },
      { data: 'gender', width: '10%' },
      {
        data: 'birthday',
        width: '12%',
        render: (value) => moment(value).format('YYYY-MM-DD'),
      },
      {
        data: 'medicalDepartment',
        width: '20%',
        render: (item) => {
          return item.name;
        },
      },
      { data: 'time', width: '12%' },
      { data: 'method', className: 'text-center', width: '12%' },
    ],
    columnDefs: [
      {
        searchable: true,
        targets: 1,
      },
      {
        orderable: false,
        targets: [0, 6],
      },
    ],
    language: {
      sProcessing: 'Đang xử lý...',
      sLengthMenu: 'Chọn số bản ghi hiển thị trên một trang _MENU_',
      sZeroRecords: 'Không có dữ liệu để hiển thị.',
      sInfo: 'Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_',
      sInfoEmpty: 'Hiển thị từ 0 đến 0 trong tổng số 0 mục',
      sInfoFiltered: '(được lọc từ _MAX_ bản ghi)',
      sInfoPostFix: '',
      sSearch: 'Tìm kiếm theo họ và tên:',
      sUrl: '',
      oPaginate: {
        sFirst: 'Đầu',
        sPrevious: 'Trước',
        sNext: 'Tiếp',
        sLast: 'Cuối',
      },
    },
  });
};

const configUnApproveOrderTbl = () => {
  $('#unApproveOrderTbl').dataTable({
    autoWidth: false,
    processing: true,
    serverSide: true,
    ajax: {
      type: 'GET',
      url: '/api/v1/medical-forms/me?populate=medicalDepartment,shift&status=2',
      dataSrc: function (json) {
        $('#unApproveOrderNav span').html(`(${json.data.length})`);

        json.data.forEach((element, index) => {
          element.index = index + 1;
          element.time = `
            <p>
              ${element.shift.time} 
              <br>
              (${moment(element.medicalDay).format('YYYY-MM-DD')})
            </p>
          `;
          element.method = `
          <div class="div_icon">
            <span title="Thông tin" id="btn-detail" class="model_img mr-1" data-toggle="modal" data-target="#infoOrderModal"><i class="mdi mdi-file-document" style="font-size: 18px"></i></span>
          </div>
          `;
        });

        return json.data;
      },
    },
    columns: [
      { data: 'index', width: '10%' },
      { data: 'fullName', width: '*' },
      { data: 'gender', width: '10%' },
      {
        data: 'birthday',
        width: '12%',
        render: (value) => moment(value).format('YYYY-MM-DD'),
      },
      {
        data: 'medicalDepartment',
        width: '20%',
        render: (item) => {
          return item.name;
        },
      },
      { data: 'time', width: '12%' },
      { data: 'deniedReason', width: '12%', render: (value) => value || '' },
      { data: 'method', className: 'text-center', width: '12%' },
    ],
    columnDefs: [
      {
        searchable: true,
        targets: 1,
      },
      {
        orderable: false,
        targets: [0, 7],
      },
    ],
    language: {
      sProcessing: 'Đang xử lý...',
      sLengthMenu: 'Chọn số bản ghi hiển thị trên một trang _MENU_',
      sZeroRecords: 'Không có dữ liệu để hiển thị.',
      sInfo: 'Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_',
      sInfoEmpty: 'Hiển thị từ 0 đến 0 trong tổng số 0 mục',
      sInfoFiltered: '(được lọc từ _MAX_ bản ghi)',
      sInfoPostFix: '',
      sSearch: 'Tìm kiếm theo họ và tên:',
      sUrl: '',
      oPaginate: {
        sFirst: 'Đầu',
        sPrevious: 'Trước',
        sNext: 'Tiếp',
        sLast: 'Cuối',
      },
    },
  });
};

const getCurrentTabId = () => {
  const topicsOrders = $('.manage-orders');

  for (let i = 0; i < topicsOrders.length; i++) {
    let node = topicsOrders[i];
    while (!$(node).hasClass('tab-pane')) {
      node = node.parentNode;
    }
    if ($(node).hasClass('active')) return '#' + node.id;
  }

  return null;
};

const handleDetail = () => {
  const formId = '#infoOrderForm';
  let order;
  $('.manage-orders').on('click', '#btn-detail', function () {
    const tabId = getCurrentTabId();
    order = $(`${tabId} table`).DataTable().row($(this).parents('tr')).data();

    const formFields = $(formId).serializeArray();
    formFields.forEach((field) => {
      if (['birthday', 'medicalDay'].includes(field.name)) {
        $(`${formId} [name='${field.name}']`)
          .val(moment(order[field.name]).format('YYYY-MM-DD'))
          .change();
      } else if (field.name === 'medicalDepartment') {
        $(`${formId} [name='medicalDepartment']`).val(
          order.medicalDepartment.name,
        );
      } else if (field.name === 'medicalHour') {
        $(`${formId} [name='medicalHour']`).val(order.shift.time);
      } else {
        $(`${formId} [name='${field.name}']`).val(order[field.name]).change();
      }
    });
    $(`${formId} #cccd`).attr('src', order.cccd);
    $(`${formId} #bhyt`).attr('src', order.bhyt);
  });
};

$(document).ready(function () {
  configAllOrderTbl();
  configNotApproveOrderTbl();
  configApproveOrderTbl();
  configUnApproveOrderTbl();
  handleDetail();
});
