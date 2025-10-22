using Application.ViewModels.Requests;
using Application.ViewModels.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IBatteryService
    {
        Task<List<BatteryResponse>> GetAllBatteriesAsync();
        Task<BatteryResponse> GetBatteryByIdAsync(Guid id);
        Task<bool> CreateBatteries(List<BatteryRequest> batteryRequests);
        Task<bool> UpdateBatteryAsync(Guid id, BatteryRequest batteryRequest);
        Task<bool> DeleteBatteryAsync(Guid id);
        Task<List<BatteryResponse>> AdminGetAllBatteriesAsync();
        Task<bool> BatteryAprovedAsync(Guid id);
    }
}
