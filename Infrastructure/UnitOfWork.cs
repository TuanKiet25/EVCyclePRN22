﻿using Application;
using Application.IRepositories;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly AppDbContext _context;
        public IUserRepository userRepository { get; }
        public IBatteryRepository batteryRepository { get; }
        public IVehicleRepository vehicleRepository { get; }
        public IListingRepository listingRepository { get; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            userRepository = new UserRepository(_context);
            batteryRepository = new BatteryRepository(_context);
            vehicleRepository = new VehicleRepository(_context);
            listingRepository = new ListingRepository(_context);
        }
        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
