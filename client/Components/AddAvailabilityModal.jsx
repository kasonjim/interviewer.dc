import React from 'react';


var AddAvail = ({info}) => (
  <div>
  <p>Hello</p>

<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
  Our Team
</button>

<div className="modal fade show" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: 'none'}} >
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">AAdd Availability</h5>
        <button  type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="modal-body">
        <p>{info.start}</p>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
  )

module.exports = AddAvail;