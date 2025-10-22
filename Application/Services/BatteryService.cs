using Application.IServices;
using Application.ViewModels.Requests;
using Application.ViewModels.Responses;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class BatteryService : IBatteryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BatteryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<BatteryResponse>> AdminGetAllBatteriesAsync()
        {
            try
            {
                var batteries = await _unitOfWork.batteryRepository.GetAllAsync(b => !b.isDeleted); 
                if (!batteries.Any())
                {
                    return new List<BatteryResponse>();
                }
                return _mapper.Map<List<BatteryResponse>>(batteries); ;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> BatteryAprovedAsync(Guid id)
        {
            
            try
            {
                var battery = await _unitOfWork.batteryRepository.GetByIdAsync(id);
                if (battery == null)
                {
                    throw new KeyNotFoundException("NO battery found");
                }
                battery.IsAproved = true;
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
               throw new Exception(ex.Message);
            }
        }

        public async Task<bool> CreateBatteries(List<BatteryRequest> batteryRequests)
        {
           
            try
            {
                if (batteryRequests == null || !batteryRequests.Any())
                {
                    throw new ArgumentException("Battery requests cannot be null or empty!");
                }
                foreach (var batteryRequest in batteryRequests)
                {
                    var checkBrand = await _unitOfWork.batteryRepository.GetAsync(b => b.Model.ToLower() == batteryRequest.Model.ToLower() && !b.isDeleted);
                    if (checkBrand != null)
                    {
                        throw new InvalidOperationException($"Battery with Model {batteryRequest.Model} already exists");
                    }
                    var battery = _mapper.Map<Battery>(batteryRequest);
                    await _unitOfWork.batteryRepository.AddAsync(battery);
                }
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteBatteryAsync(Guid id)
        {
            try
            {
                var battery = await _unitOfWork.batteryRepository.GetByIdAsync(id);
                if (battery == null)
                {
                    throw new KeyNotFoundException("Battery not found");
                }
                battery.isDeleted = true;
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<BatteryResponse>> GetAllBatteriesAsync()
        {
            try
            {
                var batteries = await _unitOfWork.batteryRepository.GetAllAsync(b => !b.isDeleted && b.IsAproved == true);
                if (!batteries.Any())
                {
                    return new List<BatteryResponse>();
                }
                return _mapper.Map<List<BatteryResponse>>(batteries);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<BatteryResponse> GetBatteryByIdAsync(Guid id)
        {
            try
            {
                var battery = await _unitOfWork.batteryRepository.GetByIdAsync(id);
                if (battery == null || battery.isDeleted)
                {
                    return null;
                }
                return _mapper.Map<BatteryResponse>(battery);
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UpdateBatteryAsync(Guid id, BatteryRequest batteryRequest)
        {
            try
            {
                var battery = await _unitOfWork.batteryRepository.GetAsync(b => b.Id == id && !b.isDeleted);
                if (battery == null)
                {
                    throw new KeyNotFoundException("Battery not found");
                }
                else if (battery.IsAproved == true)
                {
                    throw new InvalidOperationException("Approved battery cannot be updated");
                }
                var checkBrand = await _unitOfWork.batteryRepository.GetAsync(b => b.Model.ToLower() == batteryRequest.Model.ToLower() && !b.isDeleted);
                if (checkBrand != null)
                {
                    throw new InvalidOperationException("Battery with the same model already exists");
                }
                _mapper.Map(batteryRequest, battery);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
