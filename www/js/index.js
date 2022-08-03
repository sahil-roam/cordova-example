/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById('createUser').addEventListener('click', createUser)
document.getElementById('startTracking').addEventListener('click', startTracking)
document.getElementById('stopTracking').addEventListener('click', stopTracking)

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    

}



function createUser() {
    cordova.plugins.roam.createUser("SET-USER-DESCRIPTION-HERE", function(success){
        // do something on success
        console.log(success);
        document.getElementById('response').innerHTML = success;

        cordova.plugins.roam.offlineLocationTracking(true);
        cordova.plugins.roam.allowMockLocation(true);

        cordova.plugins.roam.toggleListener(true, true, function(success){
            
            // do something on success
            console.log(success);
            document.getElementById('response').innerHTML = success;
            var userResponse = JSON.parse(success)
            cordova.plugins.roam.subscribe('LOCATION', userResponse.userId);

          }, function(error){
            
            // do something on error
            console.log(error);
            document.getElementById('response').innerHTML = error;

          });

      }, function(error){
        
        // do something on error
        console.log(error);
        document.getElementById('response').innerHTML = error;

      });
}

function startTracking() {

    cordova.plugins.roam.publishAndSave(null);
    //Update location based on time interval.
    cordova.plugins.roam.startTracking('ACTIVE');
}

function stopTracking() {
    cordova.plugins.roam.stopTracking();
}

