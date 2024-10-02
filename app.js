function AppViewModel() {
    var self = this
    self.readings = ko.observableArray()
    self.load = function () {
        readXlsxFile(input.files[0]).then(function(rows) {
            console.log(rows[14])
            rows.forEach(row => {
                if(row[1]){
                    if (row[1].includes("Freezer Log - Main Lab #1")) {
                        self.readings.push({ item:row[1], 
                                        user:row[7], 
                                        date:row[8], 
                                        time:row[9], 
                                        Note:row[10],
                                        frequency:row[3], 
                                        min:row[16], 
                                        max:row[14], 
                                        inRange:row[18], 
                                        action:row[20],
                                    })
                    }
                    if (row[1].includes("Water Filter Log")) {
                        self.readings.push({ item:row[1], 
                                        user:row[7], 
                                        date:row[8], 
                                        time:row[9], 
                                        frequency:row[3], 
                                        ohms:row[14], 
                                        inRange:row[14] >= 15 && row[14] <= 18 && row[18] <= 10, 
                                        PSIin:row[16],
                                        PSIout:row[18],
                                    })
                    }
                    if (row[1].includes("Lab Specimen Freezer Log - Main Lab #2") || 
                        row[1].includes("Refrigerator Log") || 
                        row[1].includes("Incubator Temperature Lo") ||
                        row[1].includes("Lab Specimen Freezer Log - Main Lab #3") ||
                        row[1].includes("Water Bath Temperature")
                        ) {
                        self.readings.push({ item:row[1], 
                                        user:row[7], 
                                        date:row[8], 
                                        time:row[9], 
                                        Note:row[10],
                                        frequency:row[3], 
                                        temp:row[14], 
                                        inRange:row[16], 
                                        action:row[18],
                                    })
                    }
                    if (row[1].includes("Daily HLA Temperature Equipment Room") ||
                        row[1].includes("General Room Temperature Humidity Log Main La") ||
                        row[1].includes("Eyewash-Shower Temperature & Maintenance Chart")   
                    ) {
                        self.readings.push({ item:row[1], 
                                        user:row[7], 
                                        date:row[8], 
                                        time:row[9], 
                                        frequency:row[3],
                                        inRange:row[14] != '-', 
                                    })
                    }
            }
            })
            console.log(self.readings())
            console.log(self.readings().length)
          })

    }
    self.OutOfRange = ko.computed(function() {
        return _.where(self.readings(),{inRange:false}).length
    })
    self.Missed = ko.computed(function() {
        return JSON.stringify(_.where(self.readings(),{inRange:false}))
    })

}

// Activates knockout.js
ko.applyBindings(new AppViewModel());