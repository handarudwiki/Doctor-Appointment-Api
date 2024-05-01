const AppointmentController = {
    getAppointment: (req, res) => {
        const { id } = req.params
        try {

        } catch (error) {
            req.status(500).json({
                message: 'Terjadi kesalahan error',
                error: error.message
            })
        }
    },
    addAppointment: (req, res) => {
        res.json({
            message: 'Add appointment',
            data: []
        })
    }
}

module.exports = AppointmentController;