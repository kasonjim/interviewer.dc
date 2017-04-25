import * as helpers from './interviewHelpers.js';
import { getConnection } from './interviewRtcHandler.js';

/////////////////////////////////////////////////////////////////
//////////////////////   BUTTON HANDLERS   //////////////////////
/////////////////////////////////////////////////////////////////
var connection = getConnection();

exports.openRoom = function(roomid) {
  roomid = helpers.validateRoomid(roomid);

  connection.open(roomid, function() {
    helpers.disableInputButtons();
    helpers.updateCloseLeaveButton(connection, false);
    helpers.showRoomURL(connection.sessionid);
    helpers.showRole();

    connection.isInitiator ? helpers.setUserRoleText('Role: ADMIN') : helpers.setUserRoleText('Role: CLIENT');
    helpers.setRoomStatusText('Waiting for participant(s) to join');
  });
};

exports.joinRoom = function(roomid) {
  roomid = helpers.validateRoomid(roomid);

  connection.join(roomid, function() {
    helpers.disableInputButtons();
    helpers.updateCloseLeaveButton(connection, false);
    helpers.restrictClientElements();
    connection.isInitiator ? helpers.setUserRoleText('Role: ADMIN') : helpers.setUserRoleText('Role: CLIENT');
  });
  // connection.checkPresence(roomid, function(isRoomExist, roomid) {
    // helpers.disableInputButtons();
    // helpers.updateCloseLeaveButton(connection, true);
    // console.log('isRoomExist', isRoomExist);
    // if (isRoomExist) {
      // connection.join(roomid, function() {
      //   helpers.setUserRoleText('IS YOU THE ADMIN? ' + connection.isInitiator);
      // });
    // } else {
      // helpers.enableInputButtons();
      // helpers.setRoomStatusText('Room does not exist!');
    // }
  // });
};

exports.closeRoom = function() {
  helpers.updateCloseLeaveButton(connection, true);

  if (connection.isInitiator) {
    connection.closeEntireSession(function() {
      helpers.hideRoomURL();
      helpers.hideRole();
    });
  } else {
    connection.leave();
    connection.close();
  }
};

//////////////////////////////////////////////////////////////
/////////////////////  HANDLING ROOM ID  /////////////////////
//////////////////////////////////////////////////////////////
var roomParams = function() {
  var params = {};

  // LEGACY REGEX CODE
  // var r = /([^&=]+)=?([^&]*)/g;
  // var d = function(s) {
    // return decodeURIComponent(s.replace(/\+/g, ' '));
  // };
  // var match;
  // var search = window.location.search;   // this SHOULD be showing: "?roomid=xxxxxxx"
  // while (match = r.exec(search.substring(1))) {
  //   params[d(match[1])] = d(match[2]);
  // }

  // https://developer.mozilla.org/en-US/docs/Web/API/Location
  // New workaround code
  // var href = window.location.href;
  // if (href.indexOf('?roomid=') !== -1) {
  //   var split = href.split('?roomid=');
  //   params['roomid'] = split[split.length - 1];
  // }

  // Workaround code v3
  var href = window.location.href.split('&_k=').shift().split('?roomid=').pop();
  console.log('new href', href);
  params['roomid'] = href;

  window.params = params;
};
roomParams();

var roomid = '';

exports.initializeLobby = function() {
  // if (params.roomid.indexOf('http://') !== -1) {
  //   params.roomid = '';
  // }
  // console.log('connection phase 0', connection);
  // console.log('roomid phase 0', roomid);
  // console.log('window.params phase 0', params);

  if (localStorage.getItem(connection.socketMessageEvent)) {
    // roomid = localStorage.getItem(connection.socketMessageEvent);
    roomid = 'default-room-name';
  } else {
    roomid = connection.token();
  }

  // console.log('roomid phase 1', roomid);

  var roomidElement = document.getElementById('room-id');
  roomidElement.value = roomid;
  roomidElement.onkeyup = function() {
    localStorage.setItem(connection.socketMessageEvent, roomidElement.value);
  };

  roomid = params.roomid;

  // console.log('roomid phase 2', roomid);

  if (roomid && roomid.length) {
    document.getElementById('room-id').innerHTML = roomid;
    localStorage.setItem(connection.socketMessageEvent, roomid);
  // auto-join-room
    (function reCheckRoomPresence() {
      connection.checkPresence(roomid, function(isRoomExists) {
        if (isRoomExists) {
          connection.join(roomid);
          return;
        }
        setTimeout(reCheckRoomPresence, 5000);
      });
    })();

    helpers.disableInputButtons();
  }
};